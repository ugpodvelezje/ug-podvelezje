import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MembershipForm } from '../../interfaces/membership.interface';

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

  constructor(private fb: FormBuilder) {
    this.membershipForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-]+$/)]],
      address: ['', Validators.required],
      interests: [[], Validators.required],
      motivation: ['', [Validators.required, Validators.minLength(50)]]
    });
  }

  ngOnInit(): void {
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

  onSubmit(): void {
    this.submitted = true;

    if (this.membershipForm.valid) {
      console.log('Form submitted:', this.membershipForm.value);
      this.formSaved = true;
      localStorage.removeItem('membershipFormData'); // Clear saved form data
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
