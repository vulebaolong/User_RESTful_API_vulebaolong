import { userController } from "../controllers/userController";
import express from "express";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/", (req, res, next) => {
    res.status(200).json({
        status: "success",
        message: "List user",
        data: [],
    });
});

router.get("/id", (req, res, next) => {
    res.status(200).json({
        status: "success",
        message: "Get a user",
        data: {},
    });
});

router.post("/", (req, res, next) => {
    res.status(200).json({
        status: "success",
        message: "Create a user",
        data: {},
    });
});

router.delete("/id", (req, res, next) => {
    res.status(200).json({
        status: "success",
        message: "Delete a user",
        data: {},
    });
});

router.patch("/id", (req, res, next) => {
    res.status(200).json({
        status: "success",
        message: "Update a user",
        data: {},
    });
});



export default router;
