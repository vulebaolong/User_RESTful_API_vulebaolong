import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
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
    password: { type: String, required: true, select: false },
    sessionToken: { type: String, select: false },
});

export const UserModel = mongoose.model('User', userSchema);

