import { Component } from '@angular/core';
import { FooterComponent } from "../../constants/footer/footer.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-recruiter-login',
    standalone: true,
    templateUrl: './recruiter-login.component.html',
    styleUrl: './recruiter-login.component.scss',
    imports: [FooterComponent,RouterLink,]
})
export class RecruiterLoginComponent {

}
