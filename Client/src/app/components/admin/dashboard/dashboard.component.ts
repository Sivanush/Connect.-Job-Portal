import { Component } from '@angular/core';
import { AdminBackendService } from '../../../services/admin/admin.service';
import { ToastrService } from 'ngx-toastr';
import { AdminHeaderComponent } from "../shared/admin-header/admin-header.component";
import { AdminSideBarComponent } from "../shared/admin-side-bar/admin-side-bar.component";
import { FooterComponent } from '../../candidate/shared/footer/footer.component';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [AdminHeaderComponent, AdminSideBarComponent, FooterComponent,RouterLink]
})
export class DashboardComponent {
  constructor(private adminBackend:AdminBackendService,private toastr:ToastrService,private router:Router){}

  logout(): void {
    this.adminBackend.logout()
    this.toastr.success('Logout Successfully', 'Success')
  }
}
