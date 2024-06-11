import { Component } from '@angular/core';
import { FooterComponent } from "../../candidate/shared/footer/footer.component";
import { RecruiterHeaderComponent } from "../shared/recruiter-header/recruiter-header.component";
import { RecruiterSidebarComponent } from "../shared/recruiter-sidebar/recruiter-sidebar.component";
import { RecruiterService } from '../../../services/recruiter/recruiter.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-create-job',
    standalone: true,
    templateUrl: './create-job.component.html',
    styleUrl: './create-job.component.scss',
    imports: [FooterComponent, RecruiterHeaderComponent, RecruiterSidebarComponent,ReactiveFormsModule,CommonModule]
})
export class CreateJobComponent {
    jobForm:FormGroup;

    constructor(
        private recruiterService:RecruiterService,
        private toastr:ToastrService,
        private router:Router,
        private fb:FormBuilder
    ){
        this.jobForm = this.fb.group({
            job_title:['',[Validators.required,Validators.minLength(3), Validators.pattern(/^[a-zA-Z ]+$/)]],
            job_location:['',[Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z ]+$/)]],
            salary_range_min:['',[Validators.required,Validators.pattern('^[0-9]*$')]],
            salary_range_max:['',[Validators.required,Validators.pattern('^[0-9]*$')]],
            job_type:['',[Validators.required]],
            job_mode:['',[Validators.required]],
            experience_required:['',[Validators.required,]],
            skills: this.fb.array([],Validators.required) ,
            newSkill: [''],
            last_date:['',[Validators.required]],
            description:['',[Validators.required]],
            responsibilities:['',[Validators.required]],
            preference:['']
        })
    }


    // Getter for easy access to skills FormArray
  get skills(): FormArray {
    return this.jobForm.get('skills') as FormArray;
  }

  // Method to add a skill
  addSkill(): void {
    const newSkill = this.jobForm.get('newSkill') as FormControl;
    if (newSkill.valid) {
      this.skills.push(new FormControl(newSkill.value, Validators.required));
      newSkill.reset();
    }
  }

  // Method to remove a skill
  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }
        

  jobProfile(){
    const email = localStorage.getItem('recruiterEmail');
    if(email){
        this.recruiterService.createJob(email,this.jobForm.value).subscribe({
            next:(response)=>{
                console.log(response);
                this.toastr.success(response.message, 'Success');
                this.router.navigate(['/recruiter/home']);
            },
            error: (error) => {
                this.toastr.error(error.error.error, 'Error');
                console.error(error);
            }
        })
    }

  }

}
