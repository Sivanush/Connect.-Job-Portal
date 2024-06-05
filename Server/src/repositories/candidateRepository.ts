import { Candidate } from "../models/candidateModel";

class CandidateRepository{
    async createCandidate(candidateData:any){
        const candidate = new Candidate(candidateData);
        return await candidate.save();
    }

    async findCandidateByUserId(userId: string) {
        return await Candidate.findOne({ user_id: userId });
    }
}

export const candidateRepository = new CandidateRepository();