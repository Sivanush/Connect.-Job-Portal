import { User } from "../models/userModel";
import { Candidate } from "../models/candidateModel";

class AdminRepository{
    async findAdminByEmail(email:string){
        return await User.findOne({ email:email });
    }

    async getAllCandidatesWithUserInfo() {
        return await Candidate.aggregate([
            {
                $lookup: {
                    from: 'users', // The collection name in MongoDB
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            {
                $project: {
                    fullName: 1,
                    phone: 1,
                    email: '$user.email',
                    is_verified: '$user.is_verified'
                }
            }
        ]);
    }

    async updateUserVerificationStatus(userId: string, is_verified: boolean) {
        const candidatedata = await Candidate.findById(userId)
        const user_id = candidatedata?.user_id
        console.log(user_id,'fdsafddsafdsfuseruser');
        
        return await User.findByIdAndUpdate(user_id, { is_verified: is_verified }, { new: true });
    }
}

export const adminRepository = new AdminRepository()