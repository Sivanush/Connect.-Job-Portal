import { Component } from '@angular/core';
import { FooterComponent } from "../../constants/footer/footer.component";
import { UserBackendService } from '../../../services/users/user-backend.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { response } from 'express';
import { HeaderComponent } from "../../constants/header/header.component";

@Component({
    selector: 'app-user-personal-profile',
    standalone: true,
    templateUrl: './user-personal-profile.component.html',
    styleUrl: './user-personal-profile.component.scss',
    imports: [
        CommonModule,
        FooterComponent,
        FormsModule,
        HttpClientModule,
        ToastrModule,
        ReactiveFormsModule,
        HeaderComponent
    ]
})
export class UserPersonalProfileComponent {
  profileForm: FormGroup;
  currentStep: number = 1;

  constructor(
    private fb: FormBuilder,
    private toastr:ToastrService,
    private router:Router,
    private userBackend:UserBackendService
  ) {
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z ]+$/)]],
      phone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]*$')]],
      dob: ['', Validators.required],
      upload: ['', Validators.required],
      gender: ['', Validators.required],
      qualification: ['', Validators.required],
      specialization: ['',Validators.required],
      institution: ['',Validators.required],
      passoutYear: ['', [Validators.pattern('^[0-9]{4}$')]],
      passoutMonth: ['',Validators.required],
      isFresher: [false, Validators.required],
      jobRole: ['', Validators.required],
      companyName: ['', Validators.required],
      experienceDuration: [0, [Validators.required, Validators.min(0)]],
      skills: this.fb.array([],Validators.required) ,
      newSkill: [''] 
    });

  }
  newSkill(): FormControl {
    return this.fb.control('', Validators.required);
  }

  // Getter for easy access to skills FormArray
  get skills(): FormArray {
    return this.profileForm.get('skills') as FormArray;
  }

  // Method to add a skill
  addSkill(): void {
    const newSkill = this.profileForm.get('newSkill') as FormControl;
    if (newSkill.valid) {
      this.skills.push(new FormControl(newSkill.value, Validators.required));
      newSkill.reset();
    }
  }

  // Method to remove a skill
  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  

  getYearOptions(): number[] {
    const startYear = 1990;
    const endYear = new Date().getFullYear();
    let years = [];
    for (let year = startYear; year <= 2024; year++) {
      years.push(year);
    }
    return years;
  }

  candidateProfile() {
    const email = localStorage.getItem('email')
    console.log(email);
    console.log(this.profileForm.value);
    
    if (this.profileForm.value && email) {
      this.userBackend.profile(email,this.profileForm.value).subscribe({
        next:(response)=>{
          console.log(response);
          this.toastr.success(response.message, 'Success');
          this.router.navigate(['/candidate/home'])
        },
        error: (error) => {
          this.toastr.error(error.error.error, 'Error');
          console.error(error);
        }
      })
    } else {
      console.log("Form is not valid or there is no email");
    }
  }

}
