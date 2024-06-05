import { Routes } from "@angular/router";
import { RecruiterLoginComponent } from "../components/recruiter/recruiter-login/recruiter-login.component";

export const recruiterRoute : Routes = [
    {
        path:'recruiter/login',
        component:RecruiterLoginComponent
    }
]