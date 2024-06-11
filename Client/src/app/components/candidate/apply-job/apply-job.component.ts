import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { Job } from '../../../models/job.model';
import { ActivatedRoute } from '@angular/router';
import { RecruiterService } from '../../../services/recruiter/recruiter.service';
import { CommonModule } from '@angular/common';
import { userService } from '../../../services/users/user.service';

@Component({
    selector: 'app-apply-job',
    standalone: true,
    templateUrl: './apply-job.component.html',
    styleUrl: './apply-job.component.scss',
    imports: [HeaderComponent, FooterComponent,CommonModule]
})
export class ApplyJobComponent implements OnInit{
    job!: Job;
    

    constructor(
      private route: ActivatedRoute,
      private userService:userService
    ) { }
  
    ngOnInit(): void {
      const jobId = localStorage.getItem('job_id')
      
      if(jobId){
      this.userService.getJobByJobID(jobId).subscribe(
        (job) => {
            this.job = job
        },
        error => {
            console.error('Failed to fetch job details', error)
        }
      );
    }
    }
}
