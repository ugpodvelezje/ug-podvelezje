import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserService } from '../../services/browser.service';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

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
    private browserService: BrowserService
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

    if (this.contactForm.valid) {
      const formData: ContactForm = this.contactForm.value;
      
      // Create mailto link
      const subject = encodeURIComponent(`[UG Podvelezje] ${formData.subject} - ${formData.name}`);
      const body = encodeURIComponent(
        `Ime: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Predmet: ${formData.subject}\n\n` +
        `Poruka:\n${formData.message}\n\n` +
        `---\nPoslano putem kontakt forme na info@podvelezje.ba`
      );
      
      const mailtoUrl = `mailto:info@podvelezje.ba?subject=${subject}&body=${body}`;
      
      // Open email client
      if (this.browserService.getWindow()) {
        this.browserService.getWindow()!.location.href = mailtoUrl;
      }

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
      }, 3000);
    }
  }

  get f() {
    return this.contactForm.controls;
  }
}
