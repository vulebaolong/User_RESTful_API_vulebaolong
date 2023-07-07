import mongoose from "mongoose";

// tạo string đường dẫn kết nối với atlas
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const DB = process.env.MONGO_URI?.replace("<PASSWORD>", MONGO_PASSWORD as string);

//kết nối với atlas
export const mongooseConnect = ():void => {
    mongoose
        .connect(DB as string)
        .then((connect) => {
            console.log(`Kết nối mongoose thành công / name: ${connect.connection.name}`);
        })
        .catch((error) => {
            console.log(`👙  error: ${error}`);
            process.exit();
        });
};
