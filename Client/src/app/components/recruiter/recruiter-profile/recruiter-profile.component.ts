import { Component } from '@angular/core';
import { RecruiterHeaderComponent } from "../shared/recruiter-header/recruiter-header.component";
import { FooterComponent } from "../../candidate/shared/footer/footer.component";
import { RecruiterService } from '../../../services/recruiter/recruiter.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecruiterSidebarComponent } from "../shared/recruiter-sidebar/recruiter-sidebar.component";

@Component({
    selector: 'app-recruiter-profile',
    standalone: true,
    templateUrl: './recruiter-profile.component.html',
    styleUrl: './recruiter-profile.component.scss',
    imports: [RecruiterHeaderComponent, FooterComponent, ReactiveFormsModule, CommonModule, RecruiterSidebarComponent]
})
export class RecruiterProfileComponent {

    profileForm: FormGroup;
    selectedFile:File|undefined
    selectedFileName: string | null = null;
    imagePreview: string | null = null;

    constructor(
        private recruiterService:RecruiterService,
        private toastr:ToastrService,
        private fb: FormBuilder,
        private router:Router){
            this.profileForm = this.fb.group({
                fullName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z ]+$/)]],
                phone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]*$')]],
                upload: [null, Validators.required],
                companyName: ['', Validators.required],
            })
        }


        onFileSelected(event: any) {
            const file = event.target.files[0];
            if (file) {
              this.selectedFile = file;
              this.selectedFileName = file.name;
        
              // Show image preview
              const reader = new FileReader();
              reader.onload = () => {
                this.imagePreview = reader.result as string;
              };
              reader.readAsDataURL(file);
        
              this.profileForm.patchValue({
                upload: file
              });
              this.profileForm.get('upload')!.updateValueAndValidity();
            }
        }

        recruiterProfile(){
            const email = localStorage.getItem('recruiterEmail');
    if (email) {
        const formData = new FormData();
        formData.append('email', email);

        // Append each form control value to FormData
        for (const key in this.profileForm.value) {
            if (key === 'upload' && this.selectedFile) {
                formData.append('upload', this.selectedFile);
            } else if (key === 'skills') {
                this.profileForm.value[key].forEach((skill: string, index: number) => {
                    formData.append(`candidateData[skills][${index}]`, skill);
                });
            } else {
                formData.append(`candidateData[${key}]`, this.profileForm.value[key]);
            }
        }

        this.recruiterService.profile(formData).subscribe({
            next: (response) => {
                console.log(response);
                this.toastr.success(response.message, 'Success');
                this.router.navigate(['/recruiter/home']);
            },
            error: (error) => {
                this.toastr.error(error.error.error, 'Error');
                console.error(error);
            }
        });
    } else {
        console.log("Form is not valid or there is no email");
    }
        }

        
}
