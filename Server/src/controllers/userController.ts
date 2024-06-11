import { Request, Response } from "express";
import { userService } from "../services/userService";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'myjwtsecret';

class UserController {
    async signup(req: Request, res: Response) {
        try {
            const result = await userService.signup(req.body);
            res.status(200).json(result);
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }

    async verifyOtp(req: Request, res: Response) {
        const { otp, token } = req.body;
        console.log(token);
    
        try {
            if (!token) {
                throw new Error('JWT token must be provided');
            }
    
            const result = await userService.verifyOtp(token, otp);
    
            res.status(200).json(result);
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }
    


    async resendOtp(req: Request, res: Response) {
        const {email} = req.body;
        console.log('email ',email);
        
    
    if (!email) {
        return res.status(400).json({ error: 'Email must be provided' });
    }

    try {
        const result = await userService.resendOtp(email);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: 'An unknown error occurred' });
    }
    }

    async userLogin(req:Request,res:Response){
        const {email,password} = req.body;
        console.log(email,password,'dsfadsfadasf');
        
        try {
            const result = await userService.userLogin(email,password);
            res.status(200).json(result)
        } catch (err) {
            if(err instanceof Error){
            res.status(400).json({error:err.message})
            }else{
                res.status(400).json({error:'An unknown error occured'})
            }
        }
    }

    async createProfile(req: Request, res: Response) { 
        try {
            const email = req.body.email;
            const profileData = req.body.candidateData;
            const file = req.file;
            console.log(email, profileData,'njn sambavam');  // Log incoming data for debugging
    
            const result = await userService.createProfile(email, profileData, file);
            res.status(200).json(result);
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }
    

    async sendForgotOtp(req:Request,res:Response){
        try {
            const {email} = req.body;
            const result = await userService.sendForgotOtp(email);
            res.status(200).json(result);
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }
    
    async verifyForgetOtp(req:Request,res:Response){
        try {
            const {otp,token} = req.body;

            if(!token){
                throw new Error('JWT token must be required')
            }

            const result = await userService.verifyForgetOtp(otp,token)
            res.status(200).json(result)
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }

    async resetPassword(req: Request, res: Response) {
        try {
            const { email, newPassword } = req.body;
    
            if (!email || !newPassword) {
                throw new Error('Email and new password must be provided');
            }
    
            const result = await userService.changePassword(email, newPassword);
            res.status(200).json(result);
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
    }
    
}

export const userController = new UserController();
