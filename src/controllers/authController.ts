import express from "express";
import { UserModel } from "../model/userModel";
import { checkPassword, createJwt, hashedPassword } from "../helpers/authHelper";

const register = async (req: express.Request, res: express.Response) => {
    try {
        console.log(req.body);

        const { email, password, name } = req.body;

        if (!email || !password || !name) return res.sendStatus(400);

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) return res.sendStatus(400);

        const newPassword = await hashedPassword(password);

        const user = await new UserModel({
            email,
            name,
            password: newPassword,
        }).save();

        return res.status(200).json(user).end();
    } catch (error) {
        console.log("👙  error: ", error);
        return res.sendStatus(400);
    }
};

const login = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.sendStatus(400);

        const user = await UserModel.findOne({ email }).select("+password");
        if (!user) return res.sendStatus(400);

        const isPassword = await checkPassword(password, user.password);
        if (!isPassword) return res.status(401).json({ status: "success", message: "mật khẩu không đúng" });

        const accessToken = createJwt({ name: user.name, email: user.email }, "1h");
        if (!accessToken) return res.status(500).json({ status: "error", message: "Internal Server Error" });

        console.log(accessToken);

        return res.status(200).json({
            status: "success",
            message: "Đăng nhập thành công",
            data: {
                name: user.name,
                email: user.email,
                accessToken: accessToken,
            },
        });
    } catch (error) {
        console.log("👙  error: ", error);
        return res.sendStatus(400);
    }
};

export default { register, login };
