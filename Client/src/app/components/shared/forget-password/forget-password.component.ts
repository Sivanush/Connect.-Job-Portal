import { Component } from '@angular/core';
import { FooterComponent } from "../../constants/footer/footer.component";

@Component({
    selector: 'app-forget-password',
    standalone: true,
    templateUrl: './forget-password.component.html',
    styleUrl: './forget-password.component.scss',
    imports: [FooterComponent]
})
export class ForgetPasswordComponent {

}
