import express from "express";
import { userService } from "../service/userService";

export const userController = {
    register: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { email, password, name } = req.body;

            const {code, result} =  await userService.register(email, password, name);

            return res.status(code).json(result)
        } catch (error) {
            console.error(error)
            next(error)
        }
    },
    login: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { email, password } = req.body;

            const {code, result} =  await userService.login(email, password);

            return res.status(code).json(result)
        } catch (error) {
            console.error(error)
            next(error)
        }
    },
};
