import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { mongooseConnect } from "./src/db/mongooseConnect";
import authRouter from "./src/router/authRouter";

const app = express();

// MIDDLEWARE
// cho phép tất cả các yêu cầu đến từ bất kỳ nguồn nào
app.use(cors());
// nén (compress) các tài nguyên HTTP trước khi gửi từ máy chủ (server) tới trình duyệt (browser)
app.use(compression());
// express.json(): body => JSON
app.use(express.json());
// phân tích cookie
app.use(cookieParser());

// health check
app.get("/api/v1/welcome", (req, res) => {
    res.status(200).json({ status: "success", message: "Welcome User RESTful API vulebaolong" });
});

//ROUTER
app.use("/api/v1", authRouter);

// lắng nghe
const port = process.env.PORT || 3002;
const server = app.listen(port, async () => {
    console.log(`Lắng nghe cổng http://localhost:${port} ...`);
    mongooseConnect();
});
