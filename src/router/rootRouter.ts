import express from "express";
import authRouter from "./authRouter";
const router = express.Router();

export const rootRouter = (): express.Router => {
    authRouter(router);
    return router;
};
