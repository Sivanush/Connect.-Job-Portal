import { User } from "../models/userModel";

class UserRepository {
    async createUser(userData: any) {
        const user = new User(userData);
        return await user.save();
    }

    async findUserByEmail(email: string) {
        return await User.findOne({ email:email });
    }

    async updateUserVerificationStatus(email: string, is_verified: boolean) {
        return await User.updateOne({ email }, { is_verified });
    }

    async findUserById(user_id:string){
        return await User.findById(user_id)
    }

    async updateUserPassword(email: string, newPassword: string) {
        return await User.updateOne({ email }, { password: newPassword });
    }

    async updateUserIsDone (user_id: string){
        return await User.findByIdAndUpdate(user_id, { is_done: true }, { new: true });
    }

}

export const userRepository = new UserRepository();
