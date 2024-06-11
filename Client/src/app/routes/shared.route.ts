import { Routes } from "@angular/router";
import { LandingPageComponent } from "../components/shared/landing_page/landing-page.component";
import { SignupComponent } from "../components/shared/signup/signup.component";
import { OtpPageComponent } from "../components/shared/otp-page/otp-page.component";
import { ForgetPasswordComponent } from "../components/shared/forget-password/forget-password.component";

export const sharedRoute:Routes=[
    {
        path:'',
        component:LandingPageComponent
    },
    {
        path:'landing_page',
        component:LandingPageComponent
    },
    {
        path:'signup',
        component:SignupComponent
    },
    {
        path:'otp-verify',
        component:OtpPageComponent
    },
    
]