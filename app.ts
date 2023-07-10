import express from "express";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./src/routers";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

import { createRes } from "./src/helpers/responsesHeplper";

const app = express();

// MIDDLEWARE

// bảo vệ cho phép tài nguyên trong ứng dụng của bạn được truy cập từ các nguồn gốc khác nhau
app.use(
    helmet({
        contentSecurityPolicy: true,
        crossOriginResourcePolicy: { policy: "cross-origin" },
    })
);

// limit giới hạn tần suất các yêu cầu (requests) từ một địa chỉ IP cụ thể
const limiter = () => {
    const { result } = createRes(429, "Quá nhiều yêu cầu, vui lòng thử lại sau.");
    return rateLimit({
        windowMs: 2000, // 2 giây Thời gian cửa sổ (ms)
        max: 1, // Số lượng yêu cầu tối đa trong cửa sổ thời gian
        message: result, // Thông báo lỗi khi vượt quá giới hạn
    });
};
app.use("/api", limiter());

// ngăn chặn các cuộc tấn công NoSQL Injection vào MongoDB khi sử dụng Mongoose
app.use(mongoSanitize());

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

export default app;
