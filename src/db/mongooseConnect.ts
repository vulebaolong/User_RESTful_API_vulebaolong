import mongoose from "mongoose";

// tạo string đường dẫn kết nối với atlas
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const DB = process.env.MONGO_URI?.replace("<PASSWORD>", MONGO_PASSWORD as string);

//kết nối với atlas
export const mongooseConnect = (): void => {
    mongoose
        .connect(DB as string)
        .then((connect) => {
            console.log(`Database connection success / name: ${connect.connection.name}`);
        })
        .catch((error) => {
            console.log(`👙  error: ${error}`);
            process.exit();
        });
};

// Kết nối MongoDB và in thông báo khi thành công:
mongoose.connection.on("connected", () => {
    console.log("Mongodb connected to db");
});

// Xử lý lỗi khi kết nối MongoDB thất bại:
mongoose.connection.on("error", (err) => {
    console.log(err.message);
});

// Ngắt kết nối với MongoDB và xử lý khi ứng dụng tắt:
mongoose.connection.on("disconnected", () => {
    console.log('Mongodb connected is disconnected');
});

// Xử lý kết thúc ứng dụng Node.js: 
process.on('SIGINT', async () => { 
    await mongoose.connection.close()
    
    // đảm bảo kết nối với MongoDB được đóng một cách đúng đắn
    process.exit(0)
 })
