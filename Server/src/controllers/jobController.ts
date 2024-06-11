import { Request,Response } from "express";
import { jobService } from "../services/jobService";


interface CustomRequest extends Request {
    user?: {
      _id: string;
    };
  }
  

class JobController{
    async createJob(req:Request,res:Response){
        try {
            const email = req.body.email;
            const jobData = req.body.jobData;
            const result = await jobService.createJob(email,jobData)
            res.status(200).json(result);
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({ error: err.message });
            } else {
                res.status(400).json({ error: 'An unknown error occurred' });
            }
        }
        
    }

    async getAllJobs(req: Request, res: Response) {
        try {
            const jobs = await jobService.getAllJobs();
            res.status(200).json(jobs);
        } catch (err) {
            res.status(400).json({ error: 'Failed to fetch jobs' });
        }
    }

    async getAllJobsOfRecruiter(req:CustomRequest,res:Response){
        try {
            const user_id = req.user?._id;
            if (!user_id) {
                return res.status(400).json({ error: 'Invalid user ID' });
              }

              const jobs = await jobService.getAllJobsByRecruiterId(user_id);

            res.status(200).json(jobs);
        } catch (err) {
            res.status(400).json({ error: 'Failed to fetch jobs' });
        }
    }

    async getJobById(req: Request, res: Response) {
        try {
            const job_id = req.params.id;
            console.log(job_id, 'idididididi');
            
            const job = await jobService.getJobById(job_id);
            console.log('jobbbbb', job);
            
            if (!job) {
                return res.status(404).json({ error: 'Job not found' });
            }
    
            res.status(200).json(job);
        } catch (err) {
            console.error('Failed to fetch job data:', err); // Log the error for debugging
            res.status(400).json({ error: 'Failed to fetch job data' });
        }
    }
    

    async updateJob(req: Request, res: Response) {
        try {
            const jobData = req.body;
            console.log(jobData,'joddoba');
            
            const job_id = jobData.job_id
            console.log(job_id,'jobbobo');
            
            const result = await jobService.updateJob(job_id, jobData);
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


export const jobController = new JobController();