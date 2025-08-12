import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      const mailtoUrl = this.generateMailtoUrl(formData);
      
      // Debug: Log the mailto URL to console
      console.log('=== EMAIL DEBUG INFO ===');
      console.log('Generated mailto URL:', mailtoUrl);
      console.log('Form data:', formData);
      console.log('========================');
      
      // Optional: Show alert instead of opening email client
      // Uncomment the next 6 lines and comment out window.location.href to test without email client
      // const subject = `Kontakt sa web sajta - ${formData.name}`;
      // const body = `Ime i prezime: ${formData.name}\nEmail: ${formData.email}\n\nPoruka:\n${formData.message}`;
      // alert(`EMAIL WOULD BE SENT TO: info@podvelezje.ba\n\nSUBJECT: ${subject}\n\nBODY:\n${body}`);
      // console.log('Email sending simulated - check alert above');
      // return; // Stop here to prevent email client from opening
      
      window.location.href = mailtoUrl;
    }
  }

  private generateMailtoUrl(formData: any): string {
    const recipient = 'info@podvelezje.ba';
    const subject = encodeURIComponent(`Kontakt sa web sajta - ${formData.name}`);
    const body = encodeURIComponent(
      `Ime i prezime: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Poruka:\n${formData.message}`
    );
    
    return `mailto:${recipient}?subject=${subject}&body=${body}`;
  }
} 