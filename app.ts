import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from './src/routers'

const app = express();

// MIDDLEWARE

// bảo vệ cho phép tài nguyên trong ứng dụng của bạn được truy cập từ các nguồn gốc khác nhau
app.use(
    helmet({
        contentSecurityPolicy: true,
        crossOriginResourcePolicy: { policy: "cross-origin" },
    })
);

//ghi lại thông tin về các yêu cầu như URL, phương thức, thời gian phản hồi, mã trạng thái và nhiều thông tin khác
// app.use(morgan("combined"));

// cho phép tất cả các yêu cầu đến từ bất kỳ nguồn nào
app.use(cors());

// nén (compress) các tài nguyên HTTP trước khi gửi từ máy chủ (server) tới trình duyệt (browser)
app.use(compression());

// express.json(): body => JSON
app.use(express.json());

// phân tích cookie
app.use(cookieParser());



//ROUTER
app.use("/api/v1", router);



export default app


