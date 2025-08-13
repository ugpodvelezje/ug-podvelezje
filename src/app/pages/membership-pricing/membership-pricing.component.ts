import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-membership-pricing',
  imports: [],
  templateUrl: './membership-pricing.component.html',
  styleUrl: './membership-pricing.component.scss'
})
export class MembershipPricingComponent {

  constructor(private router: Router) {}

  navigateToContact(): void {
    this.router.navigate(['/contact']);
  }
}
