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