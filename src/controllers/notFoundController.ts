import express from "express";
import createError from "http-errors";
export const notFound = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    next(createError(404, `Can't find ${req.originalUrl} on this sever!`));
};
