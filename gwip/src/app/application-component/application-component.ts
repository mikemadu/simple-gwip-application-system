import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-application-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './application-component.html',
  styleUrl: './application-component.scss',
})
export class ApplicationComponent {

}
