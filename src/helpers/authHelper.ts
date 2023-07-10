import crypto from "crypto";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const random = () => crypto.randomBytes(128).toString("base64");
export const hashedPassword = async (password: string) => {
    const salt = await bcryptjs.genSalt(10)
    return await bcryptjs.hash(password, salt);
};
export const checkPassword = async (userInputPassword: string, hashedPasswordFromDatabase: string) => {
    return await bcryptjs.compare(userInputPassword, hashedPasswordFromDatabase);
};

export const createJwt = (payload: object, expiresIn: string): string | undefined => {
    const secret = process.env.SECRET;

    if (!secret) return undefined;

    const token = jwt.sign(payload, secret, { expiresIn });

    return token;
};
