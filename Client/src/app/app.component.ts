import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserPersonalProfileComponent } from "./components/candidate/user-personal-profile/user-personal-profile.component";
import { ForgetPasswordComponent } from "./components/shared/forget-password/forget-password.component";
import { HeaderComponent } from "./components/constants/header/header.component";
import { AdminLoginComponent } from "./components/admin/admin-login/admin-login.component";
import { DashboardComponent } from "./components/admin/dashboard/dashboard.component";
import { UserListComponent } from "./components/admin/user-list/user-list.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, UserPersonalProfileComponent, ForgetPasswordComponent, HeaderComponent, AdminLoginComponent, DashboardComponent, UserListComponent]
})
export class AppComponent {
  title = 'Client';
}
