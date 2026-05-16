import { Component, inject } from '@angular/core';
import { SharedService } from '../../shared-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application-list-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './application-list-component.html',
  styleUrl: './application-list-component.scss',
})
export class ApplicationListComponent {
  sharedService = inject(SharedService);
  applications: any[] = []; // Array to hold the list of applications

  errorMessage: string = ''; // Variable to hold error messages

  ngOnInit() {
  //load the list of applications when the component is initialized
    this.loadApplications();
  }

 async loadApplications() {
   const data = await this.sharedService.callAPI('application_service.php', 'get-application-list', null);
    if(data.success)  {
      this.applications = data.result;
    } else {
      this.errorMessage = data.message;
      console.error('Failed to load applications:', data.message);
    }
  }
}
