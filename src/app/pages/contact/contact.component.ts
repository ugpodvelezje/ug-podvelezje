import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserService } from '../../services/browser.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;
  messageSent = false;
  sending = false;
  errorMessage = '';

  subjectOptions = [
    'Opće informacije',
    'Članstvo',
    'Volontiranje',
    'Donacije',
    'Medijsko pokrivanje',
    'Partnerstvo',
    'Ostalo'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private browserService: BrowserService,
    private emailService: EmailService
  ) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    const localStorage = this.browserService.getLocalStorage();
    if (localStorage) {
      const savedForm = localStorage.getItem('contactFormData');
      if (savedForm) {
        this.contactForm.patchValue(JSON.parse(savedForm));
      }

      this.contactForm.valueChanges.subscribe(value => {
        localStorage.setItem('contactFormData', JSON.stringify(value));
      });
    }
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.contactForm.valid) {
      this.sending = true;
      
      this.emailService.sendEmail(this.contactForm.value).subscribe({
        next: (response) => {
          this.sending = false;
          if (response.success) {
            this.messageSent = true;
            
            // Clear saved form data
            const localStorage = this.browserService.getLocalStorage();
            if (localStorage) {
              localStorage.removeItem('contactFormData');
            }
            
            // Reset form after delay
            setTimeout(() => {
              this.contactForm.reset();
              this.submitted = false;
              this.messageSent = false;
            }, 5000);
          } else {
            this.errorMessage = response.error || 'Greška prilikom slanja poruke';
          }
        },
        error: (error) => {
          this.sending = false;
          console.error('Email sending failed:', error);
          this.errorMessage = 'Greška prilikom slanja poruke. Pokušajte ponovo.';
        }
      });
    }
  }

  get f() {
    return this.contactForm.controls;
  }
}
