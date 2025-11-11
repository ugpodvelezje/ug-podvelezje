import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from '../../interfaces/member.interface';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'app-members-list-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './members-list-modal.component.html',
  styleUrl: './members-list-modal.component.scss'
})
export class MembersListModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();

  private membersService = inject(MembersService);

  public allMembers: Member[] = [];
  public filteredMembers: Member[] = [];
  public selectedFilter: 'All' | 'Gold' | 'Regular' | 'Honorary' = 'All';

  // Membership type labels in Bosnian
  public membershipTypeLabels = {
    'Gold': 'Zlatni član',
    'Regular': 'Redovni član',
    'Honorary': 'Počasni član'
  };

  ngOnInit(): void {
    this.loadMembers();
  }

  private loadMembers(): void {
    this.membersService.getMembers().subscribe(members => {
      this.allMembers = members;
      this.applyFilters();
    });
  }

  public onClose(): void {
    this.closeModal.emit();
  }

  public onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.onClose();
    }
  }

  public filterByType(type: 'All' | 'Gold' | 'Regular' | 'Honorary'): void {
    this.selectedFilter = type;
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.allMembers];

    // Apply type filter
    if (this.selectedFilter !== 'All') {
      filtered = filtered.filter(member => member.membershipType === this.selectedFilter);
    }

    this.filteredMembers = filtered;
  }

  public getMembershipTypeLabel(type: 'Gold' | 'Regular' | 'Honorary'): string {
    return this.membershipTypeLabels[type];
  }

  public getMembershipTypeBadgeClass(type: 'Gold' | 'Regular' | 'Honorary'): string {
    return `badge-${type.toLowerCase()}`;
  }

  public get memberStats() {
    return this.membersService.getMemberStatistics();
  }
}
