import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminHeaderComponent } from "../shared/admin-header/admin-header.component";
import { AdminSideBarComponent } from "../shared/admin-side-bar/admin-side-bar.component";
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { AdminBackendService } from '../../../services/admin/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-recruiter-list',
    standalone: true,
    templateUrl: './recruiter-list.component.html',
    styleUrl: './recruiter-list.component.scss',
    imports: [AdminHeaderComponent, AdminSideBarComponent,CommonModule,MatPaginator]
})
export class RecruiterListComponent implements OnInit{
    recruiters: any[] = [];
    displayedUsers: any[] = [];
    isLoading: boolean = true;

    length = 0;
    pageSize = 5;
    pageIndex = 0;
    pageSizeOptions = [5, 10, 15];

    @ViewChild(MatPaginator) paginator !: MatPaginator;

    constructor(private adminBackend:AdminBackendService,private toastr:ToastrService){}

    ngOnInit(): void {
      this.loadUsers();
    }

    loadUsers(): void {
        this.adminBackend.getRecruiters().subscribe(
          data => {
            this.recruiters = data;
            this.length = this.recruiters.length;
            this.updateDisplayedUsers();
            this.isLoading = false;
          },
          error => {
            console.error('Error fetching recruiters:', error);
            this.isLoading = false;
          }
        );
      }

      updateDisplayedUsers(): void {
        const start = this.pageIndex * this.pageSize;
        const end = start + this.pageSize;
        this.displayedUsers = this.recruiters.slice(start, end);
      }
    
      handlePageEvent(event: any): void {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.updateDisplayedUsers();
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
