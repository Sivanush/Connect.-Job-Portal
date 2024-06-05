import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from "../constants/admin-header/admin-header.component";
import { AdminSideBarComponent } from "../constants/admin-side-bar/admin-side-bar.component";
import { AdminBackendService } from '../../../services/admin/admin-backend.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-user-list',
    standalone: true,
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    imports: [AdminHeaderComponent, AdminSideBarComponent,CommonModule,]
})
export class UserListComponent implements OnInit {
    users: any[] = [];
    isLoading: boolean = true;

    constructor(private adminBackend:AdminBackendService,private toastr:ToastrService){}

    ngOnInit(): void {
        this.adminBackend.getUsers().subscribe(
          data => {
            this.users = data;
            this.isLoading = false;
          },
          error => {
            console.error('Error fetching users:', error);
            this.isLoading = false;
          }
        );
      }
    
      toggleVerificationStatus(user: any): void {
        if (!user) {
          console.error('User data is not available');
          return;
        }
    
        const newStatus = !user.is_verified;
        this.adminBackend.updateUserVerificationStatus(user._id, newStatus).subscribe(
            updatedUser => {
              if (updatedUser) {
                user.is_verified = updatedUser.is_verified;
                const status = updatedUser.is_verified ? 'unblocked' : 'blocked';
                this.toastr.success(`User is now ${status}`, 'Success');
              } else {
                console.error('Failed to update user status');
                this.toastr.error('Failed to update user status', 'Error');
              }
            },
            error => {
              console.error('Error updating user status:', error);
              this.toastr.error('Error updating user status', 'Error');
            }
          );
      }
    
    

}