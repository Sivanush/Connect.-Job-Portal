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
}

export const userRepository = new UserRepository();
