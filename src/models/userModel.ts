import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const userSchema: Schema<IUser> = new Schema(
    {
        name: {
            type: String,
            required: [true, "Bắt buộc phải có tên"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Bắt buộc phải có email"],
            unique: true,
            lowercase: true,
            validate: {
                validator: function (val: string) {
                    return validator.isEmail(val);
                },
                message: "Email không hợp lệ",
            },
        },
        password: { type: String, required: [true, "Bắt buộc phải có password"], select: false },
    },
    {
        collection: "users",
        timestamps: true,
    }
);

export const UserModel = mongoose.model<IUser>("User", userSchema);
