import { UserModel, IUser } from "../models/userModel";

export const UserService = {
    findUserByEmail: async (email: string): Promise<IUser | null> => {
        return UserModel.findOne({ email });
    },

    createUser: async (userData: IUser): Promise<IUser | null> => {
        return new UserModel(userData).save();
    },
}; 

