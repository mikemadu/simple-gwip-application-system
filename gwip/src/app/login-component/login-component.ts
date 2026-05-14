import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../shared-service';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {
sharedService = inject(SharedService);
  

  async doLogin(frm: any) {
    const formData = frm.value;
    console.log('Login form data: ', formData);
    //alert('Login not implemented yet. Form data: ' + JSON.stringify(formData));
  }
}
