import { userRepository } from "../repositories/userRepository";
import { candidateRepository } from "../repositories/candidateRepository";
import { otpService } from "../functions/otpService";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const OTP_EXPIRY_TIME = 60; // 1 minute in seconds
const JWT_SECRET = process.env.JWT_SECRET || 'myjwtsecret';

class UserService {
    async signup(userData: any) {
        const existingUser = await userRepository.findUserByEmail(userData.email);
        if (existingUser) {
            throw new Error('This user already exists');
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);

        // Save the user with is_verified set to false
        const user = await userRepository.createUser({ ...userData, is_verified: false });

        // Generate OTP and JWTs
        const otp = this.generateOtp();
        await otpService.sendOtp(user.email, otp);
        console.log(otp,'thisisthe otp');
        
        // Generate OTP token with short expiration time
        const otpToken = jwt.sign({ email: user.email, otp }, JWT_SECRET, { expiresIn: OTP_EXPIRY_TIME });

        // Generate email verification token with longer expiration time

        return { message: 'Otp sent to your email', otpToken };
    }

    generateOtp() {
        const randomNumber = crypto.randomInt(0, 1000000);
        return String(randomNumber).padStart(6, '0');
    }

    async verifyOtp(otpToken: string, otp: string) {
        try {
            // Verify and decode the OTP token
            const decoded: any = jwt.verify(otpToken, JWT_SECRET);
            const email = decoded.email;
            const storedOtp = decoded.otp;

            if (storedOtp !== otp) {
                throw new Error('Otp invalid');
            }

            // Mark user as verified
            await userRepository.updateUserVerificationStatus(email, true);

            return { message: 'User verified successfully' };

        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                throw new Error('Otp expired');
            } else {
                throw err;
            }
        }
    }

    async resendOtp(email: string) {
        try {
            const user = await userRepository.findUserByEmail(email);
            if (!user) {
                throw new Error('User not found');
            }

            if (user.is_verified) {
                throw new Error('User already verified');
            }

            // Generate and send new OTP
            const otp = this.generateOtp();
            await otpService.sendOtp(email, otp);

            // Generate new OTP token with short expiration time
            const newOtpToken = jwt.sign({ email, otp }, JWT_SECRET, { expiresIn: OTP_EXPIRY_TIME });

            return { message: 'Otp sent to your email', newOtpToken };

        } catch (err) {
            throw new Error('Unknown error occured');
        }
    }

    async userLogin(email:string,password:string){
        const user = await userRepository.findUserByEmail(email);
        console.log(password,'dsfafddfsdfdsfdfeferereerer');
        console.log(user,'dsfhuuseruseruser');
        
        if(!user){
            throw new Error('user not exists')
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)
        console.log(isPasswordValid);
        
        if(!isPasswordValid){
            throw new Error('Invalid email or password')
        }
        if(!user.is_verified){
            throw new Error('User is not verified')
        }

        const token = jwt.sign({email:user.email,id:user._id},JWT_SECRET,{expiresIn:'10h'});
        return {token,user:{email:user.email,id:user._id,username:user.username}}
    }

    async createProfile(email:string,profileData:any){
        const user = await userRepository.findUserByEmail(email)

        if(!user){
            throw new Error('User not found')
        }
        const user_id = user._id;
        const candidateData = {
            user_id: user_id,
            fullName: profileData.candidateData.fullName,
            phone: profileData.candidateData.phone,
            dob: profileData.candidateData.dob,
            image: profileData.candidateData.upload,
            gender: profileData.candidateData.gender,
            education: [{
                qualification: profileData.candidateData.qualification,
                specialization: profileData.candidateData.specialization,
                nameOfInstitution: profileData.candidateData.institution,
                passoutYear: profileData.candidateData.passoutYear,
                passoutMonth: profileData.candidateData.passoutMonth
            }],
            experience: [{
                isFresher: profileData.candidateData.isFresher,
                jobRole: profileData.candidateData.jobRole,
                companyName: profileData.candidateData.companyName,
                experienceDuration: profileData.candidateData.experienceDuration
            }],
            skills: profileData.candidateData.skills
        };
        const candidate = await candidateRepository.createCandidate(candidateData)
        return candidate
    }
}

export const userService = new UserService();
