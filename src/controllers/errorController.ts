import express from "express";
import { logTer } from "../helpers/logEvents";



export const globalErrorHandler = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logTer(`${req.url} --- ${req.method} --- ${err.message}`)
    const message: {} = err.message;
    const statusCode: number = err.status || 500;
    const status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    res.status(statusCode).json({
        status,
        message,
        data: null,
        links: {
            docs: "https://doc.com/api",
        },
    });
};
