import { IRes, createRes } from "../helpers/responsesHeplper";
import { checkPassword, createJwt, hashedPassword } from "../helpers/authHelper";
import { UserModel, IUser } from "../models/userModel";



export const userService = {
    register: async (email: string, password: string, name: string): Promise<IRes> => {
        if (!email || !password || !name) return createRes(400, "Vui lòng cung cấp đầy đủ các trường");

        const existingUser = await UserModel.findOne({ email }).select("-password");
        if (existingUser) return createRes(400, "tài khoản đã tồn tại");

        const newPassword = await hashedPassword(password);

        const user = await new UserModel({
            name,
            email,
            password: newPassword,
        }).save();

        return createRes(200, "Xử lý thành công", {
            id: user._id,
            name: user.name,
            email: user.email,
        });
    },
    login: async (email: string, password: string): Promise<IRes> => {
        if (!email || !password) return createRes(401, "Vui lòng cung cấp đầy đủ các trường");

        const user = await UserModel.findOne({ email }).select("+password");
        if (!user) return createRes(401, "Người dùng không tồn tại");

        const isPassword = await checkPassword(password, user.password);
        if (!isPassword) return createRes(401, "Mật khẩu không đúng");

        const accessToken = createJwt({ name: user.name, email: user.email }, "1h");
        if (!accessToken) return createRes(500, "Internal Server Error");

        return createRes(200, "Đăng nhập thành công", {
            id: user._id,
            name: user.name,
            email: user.email,
            accessToken: accessToken,
        });
    },
};
