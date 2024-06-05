import { Component } from '@angular/core';
import { FooterComponent } from '../../constants/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserBackendService } from '../../../services/users/user-backend.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FooterComponent,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm:FormGroup;
  

  constructor(
    private userBackend:UserBackendService,
    private toastr:ToastrService,
    private fb:FormBuilder,
    private router:Router
  ){
    this.loginForm = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.pattern(/^[a-zA-Z0-9@!#$%^&*_-]{8,}$/)]],
    })
  }

  

  userLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
       
      this.userBackend.login(this.loginForm.value).subscribe({
        next:(response)=>{
          console.log(response);
          localStorage.setItem('userToken',response.token)
          localStorage.setItem('user',response.user)
          this.toastr.success(response.message,'Success')
          this.router.navigate(['/candidate/profile'])
        },
        error: (error) => {
          this.toastr.error(error.error.error, 'Error');
          console.error(error);
        }
      })
    } else {
      this.toastr.error('Please enter valid email and password', 'Error');
    }
  }
}
