import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule if using ngIf, ngFor etc.
import { ReactiveFormsModule } from '@angular/forms'; // Import if using reactive forms

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Add necessary modules here
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

} 