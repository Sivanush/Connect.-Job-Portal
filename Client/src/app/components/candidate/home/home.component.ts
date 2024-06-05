import { Component } from '@angular/core';
import { UserBackendService } from '../../../services/users/user-backend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private userBackend:UserBackendService,private toastr:ToastrService){}

  logout(): void {
    this.userBackend.logout()
    this.toastr.success('Logout Successfully', 'Success')
  }
}
