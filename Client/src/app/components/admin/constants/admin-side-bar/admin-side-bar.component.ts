import { Component } from '@angular/core';
import { AdminBackendService } from '../../../../services/admin/admin-backend.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-side-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-side-bar.component.html',
  styleUrl: './admin-side-bar.component.scss'
})
export class AdminSideBarComponent {
  constructor(private adminBackend:AdminBackendService,private toastr:ToastrService){}

  logout(): void {
    this.adminBackend.logout()
    this.toastr.success('Logout Successfully', 'Success')
  }
}
