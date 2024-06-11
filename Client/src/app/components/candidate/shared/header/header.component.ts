import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { userService } from '../../../../services/users/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private userBackend:userService,private toastr:ToastrService){}
  logout():void{
    this.userBackend.logout()
    this.toastr.success('Logout Successfully', 'Success')
  }
}
