import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserBackendService {

  private apiKey:string = 'http://localhost:5001/candidate'

  constructor(private http:HttpClient,private router:Router,@Inject(PLATFORM_ID) private platformId: Object){  }

  get isLoggedIn() {
    if (isPlatformBrowser(this.platformId)) {
      const userToken = localStorage.getItem('userToken');
      return !!userToken;
    }
    return false;
  }



  signup(data:any):Observable<any>{
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

  login(data:any):Observable<any>{

    return this.http.post(`${this.apiKey}/login`,data)
  }

  profile(email:string,candidateData:any):Observable<any>{
    const body = {email,candidateData}
    return this.http.post(`${this.apiKey}/profile`,body)
  }



  logout():void{
    localStorage.removeItem('userToken');
    this.router.navigate(['/candidate/login'])
  }
}