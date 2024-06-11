import { Component, ViewChild } from '@angular/core';
import { userService } from '../../../services/users/user.service';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from "../shared/header/header.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { Job } from '../../../models/job.model';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [HeaderComponent, FooterComponent,CommonModule,MatPaginator]
})
export class HomeComponent {
  constructor(private userBackend:userService,private toastr:ToastrService,private router:Router){}

  jobs: Job[] = [];
  displayedJobs: Job[] = [];
  length = 0;
  pageSize = 3;
  pageIndex = 0;
  pageSizeOptions = [3, 4,5];


  @ViewChild(MatPaginator) paginator !: MatPaginator;

  ngOnInit(): void {
    this.userBackend.getJobs().subscribe((data) => {
      this.jobs = data;
      this.length = this.jobs.length;
      this.updateDisplayedUsers();
    });
  }

  updateDisplayedUsers(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.displayedJobs = this.jobs.slice(start, end);
  }

  handlePageEvent(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayedUsers();
  }

  applyJob(job_id:string){
    console.log(job_id);
    localStorage.setItem('job_id',job_id)
    this.router.navigate(['/candidate/apply-job'])
  }


  logout(): void {
    this.userBackend.logout()
    this.toastr.success('Logout Successfully', 'Success')
  }
}
