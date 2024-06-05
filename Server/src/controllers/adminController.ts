import { Request,Response } from "express";
import { adminService } from "../services/adminService";

class AdminController{
    async adminLogin(req:Request,res:Response){
        const {email,password} = req.body;
        console.log(email,password,'dsfadsfadasf');
        
        try {
            const result = await adminService.adminLogin(email,password);
            res.status(200).json(result)
        } catch (err) {
            if(err instanceof Error){
            res.status(400).json({error:err.message})
            }else{
                res.status(400).json({error:'An unknown error occured'})
            }
        }
    }

    async getAllCandidatesWithUserInfo(req: Request, res: Response) {
        try {
            const candidates = await adminService.getAllCandidatesWithUserInfo();
            res.status(200).json(candidates);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching users', error });
        }
    }

    async updateUserVerificationStatus(req: Request, res: Response) {
        const userId = req.params.id;
        const { is_verified } = req.body;
        try {
          const updatedUser = await adminService.updateUserVerificationStatus(userId, is_verified);
          res.status(200).json(updatedUser);
        } catch (err) {
          if (err instanceof Error) {
            res.status(400).json({ error: err.message });
          } else {
            res.status(400).json({ error: 'An unknown error occurred' });
          }
        }
      }


}


export const adminController = new AdminController();