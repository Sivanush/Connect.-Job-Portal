import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../candidate/shared/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [FooterComponent,MatButtonModule,RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  constructor(private router:Router){}

  btnClick() {
    console.log('clicked');
    
    this.router.navigateByUrl('candidate/signup')  
  }

}
