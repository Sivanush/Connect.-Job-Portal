import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Job } from '../../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class userService {

  private apiKey = environment.userApiKey

  constructor(private http:HttpClient,private router:Router,@Inject(PLATFORM_ID) private platformId: Object){  }

  get isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const userToken = localStorage.getItem('userToken');
      return !!userToken;
    }
    return false;
  }



  signup(data:object):Observable<any>{
    return this.http.post<any>(`${this.apiKey}/signup`,data)
  }

  verifyOtp(otp: string, token: string): Observable<any> {

    const body = { otp,token }; 
    return this.http.post<any>(`${this.apiKey}/verify-otp`, body);
  }

  resendOtp(email: string): Observable<any> {
    const body = {email}
    return this.http.post(`${this.apiKey}/resend-otp`, body);
  }

  login(data:object):Observable<any>{

    return this.http.post(`${this.apiKey}/login`,data)
  }

  profile(candidateData: FormData): Observable<any> {
    return this.http.post(`${this.apiKey}/profile`, candidateData);
  }

  getJobByJobID(job_id:string):Observable<any>{
    return this.http.get<any>(`${this.apiKey}/apply-job/${job_id}`)
  }


  forgotPassword(email:string):Observable<any>{
    const body = email
    return this.http.post(`${this.apiKey}/forgot-password`,body)
  }

  verifyForgetPassword(otp:string,token:string):Observable<any>{
    const body = {otp,token}
    return this.http.post(`${this.apiKey}/verify-forget-password`,body)
  }

  resetPassword(email:string,newPassword:string):Observable<any>{
    const body = {email,newPassword};
    return this.http.post(`${this.apiKey}/reset-password`,body)
  }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiKey}/home`);
  }


  logout():void{
    localStorage.removeItem('userToken');
    this.router.navigate(['/candidate/login'])
  }

  
}