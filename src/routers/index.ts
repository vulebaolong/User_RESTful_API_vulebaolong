import express from "express";
import userRouter from './userRouter'
import { notFound } from "../controllers/notFoundController";
import { globalErrorHandler } from "../controllers/errorController";

const router = express.Router();

// health check
router.get("/welcome", (req, res) => {
    res.status(200).json({ status: "success", message: "Welcome User RESTful API vulebaolong" });
});

router.use("/users", userRouter);

//xử lý các URL người dùng sử dụng không đúng
router.all("*", notFound);
router.use(globalErrorHandler);

export default router