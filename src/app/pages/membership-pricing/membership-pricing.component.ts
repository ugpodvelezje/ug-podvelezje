import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MembersListModalComponent } from '../../components/members-list-modal/members-list-modal.component';

@Component({
  selector: 'app-membership-pricing',
  imports: [MembersListModalComponent],
  templateUrl: './membership-pricing.component.html',
  styleUrl: './membership-pricing.component.scss'
})
export class MembershipPricingComponent {
  public showMembersModal = false;

  constructor(private router: Router) {}

  navigateToContact(): void {
    this.router.navigate(['/contact']);
  }

  openMembersModal(): void {
    this.showMembersModal = true;
  }

  closeMembersModal(): void {
    this.showMembersModal = false;
  }
}
