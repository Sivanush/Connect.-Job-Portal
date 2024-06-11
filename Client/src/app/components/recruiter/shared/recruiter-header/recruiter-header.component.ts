import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recruiter-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recruiter-header.component.html',
  styleUrl: './recruiter-header.component.scss'
})
export class RecruiterHeaderComponent {
  
  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('-translate-x-full');
    }
  }


}
