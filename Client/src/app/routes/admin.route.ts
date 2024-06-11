import { Routes } from "@angular/router";
import { AdminLoginComponent } from "../components/admin/admin-login/admin-login.component";
import { DashboardComponent } from "../components/admin/dashboard/dashboard.component";
import { adminAuthGuard } from "../guard/admin-auth.guard";
import { UserListComponent } from "../components/admin/user-list/user-list.component";
import { RecruiterListComponent } from "../components/admin/recruiter-list/recruiter-list.component";

export const adminRoute:Routes = [
    {
        path:'admin/login',
        component:AdminLoginComponent
    },
    {
        path:'admin',
        component:AdminLoginComponent
    },
    {
        path:'admin/dashboard',
        component:DashboardComponent,
        canActivate:[adminAuthGuard]
    },
    {
        path:'admin/user-list',
        component:UserListComponent,
        canActivate:[adminAuthGuard]
    },
    {
        path:'admin/recruiter-list',
        component:RecruiterListComponent,
        canActivate:[adminAuthGuard]
    }

]