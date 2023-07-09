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

mongoose.connection.on("connected", () => {
    console.log("Mongodb connected to db");
});

mongoose.connection.on("error", (err) => {
    console.log(err.message);
});

mongoose.connection.on("disconnected", () => {
    console.log('Mongodb connected is disconnected');
});

process.on('SIGINT', async () => { 
    await mongoose.connection.close()
    process.exit(0)
 })
