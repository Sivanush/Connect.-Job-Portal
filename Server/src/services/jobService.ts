import { jobRepository } from "../repositories/jobRepository";
import { recruiterRepository } from "../repositories/recruiterRepository";
import { userRepository } from "../repositories/userRepository";


class JobService{
   
    async createJob(email:string,jobData:any){
        console.log(email,'emailslsl');
        
        const user = await userRepository.findUserByEmail(email);
    
        if (!user) {
            throw new Error('User not found');
        }
        const userId = user._id.toString();

        const recruiter = await recruiterRepository.findRecruiterByUserId(userId)
        const recruiter_id = recruiter?._id

        let generateJID = Math.floor(1000 + Math.random() * 9000).toString();
        let existingOrder = await jobRepository.findJobByJobId(generateJID)

        while (existingOrder) {
            generateJID = Math.floor(1000 + Math.random() * 9000).toString();
            existingOrder = await jobRepository.findJobByJobId(generateJID)
        }
        const jobId = `JB${generateJID}`;


        const newJobData = {
            recruiter_id:recruiter_id,
            job_id:jobId,
            job_title:jobData.job_title,
            job_location:jobData.job_location,
            salary_range_min:jobData.salary_range_min,
            salary_range_max:jobData.salary_range_max,
            job_type:jobData.job_type,
            job_mode:jobData.job_mode,
            experience_required:jobData.experience_required,
            skills_required:jobData.skills,
            last_date:jobData.last_date,
            description:jobData.description,
            responsibilities:jobData.responsibilities,
            preference:jobData.preference
        }
        console.log(newJobData,'this is new new new');
        

        const job = await jobRepository.createJob(newJobData);

        return {job,message:'Job created successfully'}
    }

    async getAllJobs() {
        return await jobRepository.findAllJobs();
    }

    async getAllJobsByRecruiterId(user_id: string) {
        const recruiter = await recruiterRepository.findRecruiterByUserId(user_id);
        const recruiter_id = recruiter?._id.toString();

        if (!recruiter_id) {
            throw new Error('Recruiter not found');
          }

        return await jobRepository.findJobsByRecruiterId(recruiter_id);

    }

    async getJobById(job_id:string){
        return await jobRepository.findJobByJobId(job_id)
    }


    async updateJob(job_id: string, jobData: any) {
        const existingJob = await jobRepository.findJobByJobId(job_id);
    
        if (!existingJob) {
          throw new Error('Job not found');
        }
    
        const updatedJobData = {
          job_title: jobData.job_title,
          job_location: jobData.job_location,
          salary_range_min: jobData.salary_range_min,
          salary_range_max: jobData.salary_range_max,
          job_type: jobData.job_type,
          job_mode: jobData.job_mode,
          experience_required: jobData.experience_required,
          skills_required: jobData.skills,
          last_date: jobData.last_date,
          description: jobData.description,
          responsibilities: jobData.responsibilities,
          preference: jobData.preference
        };
    
        const updatedJob = await jobRepository.updateJob(job_id, updatedJobData);
        return { updatedJob, message: 'Job updated successfully' };
      }
    
    
}


export const jobService = new JobService();