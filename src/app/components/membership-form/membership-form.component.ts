import { Component, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MembershipForm } from '../../interfaces/membership.interface';
import { BrowserService } from '../../services/browser.service';

@Component({
  selector: 'app-membership-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './membership-form.component.html',
  styleUrls: ['./membership-form.component.scss']
})
export class MembershipFormComponent implements OnInit {
  membershipForm: FormGroup;
  submitted = false;
  formSaved = false;

  interestOptions = [
    'Razvoj Zajednice',
    'Zaštita Okoliša',
    'Kulturni Događaji',
    'Obrazovanje',
    'Sportske Aktivnosti',
    'Društveni Rad'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private browserService: BrowserService
  ) {
    this.membershipForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      interests: ['', Validators.required],
      motivation: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const localStorage = this.browserService.getLocalStorage();
    if (localStorage) {
      // Load saved form data from localStorage if exists
      const savedForm = localStorage.getItem('membershipFormData');
      if (savedForm) {
        this.membershipForm.patchValue(JSON.parse(savedForm));
      }

      // Save form changes to localStorage
      this.membershipForm.valueChanges.subscribe(value => {
        localStorage.setItem('membershipFormData', JSON.stringify(value));
      });
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.membershipForm.valid) {
      console.log('Form submitted:', this.membershipForm.value);
      this.formSaved = true;
      const localStorage = this.browserService.getLocalStorage();
      if (localStorage) {
        localStorage.removeItem('membershipFormData'); // Clear saved form data
      }
      this.membershipForm.reset();
      this.submitted = false;
    }
  }

  // Helper methods for form validation
  get f() {
    return this.membershipForm.controls;
  }

  toggleInterest(interest: string): void {
    const interests = this.membershipForm.get('interests')?.value as string[];
    const index = interests.indexOf(interest);
    
    if (index === -1) {
      interests.push(interest);
    } else {
      interests.splice(index, 1);
    }
    
    this.membershipForm.patchValue({ interests });
  }
}
