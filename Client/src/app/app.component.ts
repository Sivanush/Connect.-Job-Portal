import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecruiterHomeComponent } from "./components/recruiter/recruiter-home/recruiter-home.component";
import { RecruiterProfileComponent } from "./components/recruiter/recruiter-profile/recruiter-profile.component";
import { CreateJobComponent } from "./components/recruiter/create-job/create-job.component";
import { HomeComponent } from "./components/candidate/home/home.component";
import { ApplyJobComponent } from "./components/candidate/apply-job/apply-job.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, RecruiterHomeComponent, RecruiterProfileComponent, CreateJobComponent, HomeComponent, ApplyJobComponent]
})
export class AppComponent {
  title = 'Client';
}
