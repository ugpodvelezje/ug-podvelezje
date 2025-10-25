import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MembersListModalComponent } from './members-list-modal.component';
import { MembersService } from '../../services/members.service';
import { of } from 'rxjs';

describe('MembersListModalComponent', () => {
  let component: MembersListModalComponent;
  let fixture: ComponentFixture<MembersListModalComponent>;
  let membersService: jasmine.SpyObj<MembersService>;

  const mockMembers = [
    { id: 1, name: 'Test Member 1', membershipType: 'Gold' as const },
    { id: 2, name: 'Test Member 2', membershipType: 'Regular' as const },
    { id: 3, name: 'Test Member 3', membershipType: 'Honorary' as const }
  ];

  beforeEach(async () => {
    const membersServiceSpy = jasmine.createSpyObj('MembersService', [
      'getMembers',
      'getMemberStatistics'
    ]);

    await TestBed.configureTestingModule({
      imports: [MembersListModalComponent],
      providers: [
        { provide: MembersService, useValue: membersServiceSpy }
      ]
    }).compileComponents();

    membersService = TestBed.inject(MembersService) as jasmine.SpyObj<MembersService>;
    membersService.getMembers.and.returnValue(of(mockMembers));
    membersService.getMemberStatistics.and.returnValue({
      total: 95,
      gold: 21,
      regular: 69,
      honorary: 5
    });

    fixture = TestBed.createComponent(MembersListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load members on init', () => {
    expect(membersService.getMembers).toHaveBeenCalled();
    expect(component.allMembers.length).toBe(3);
    expect(component.filteredMembers.length).toBe(3);
  });

  it('should filter members by type', () => {
    component.filterByType('Gold');
    expect(component.selectedFilter).toBe('Gold');
    expect(component.filteredMembers.length).toBe(1);
    expect(component.filteredMembers[0].membershipType).toBe('Gold');
  });

  it('should filter regular members', () => {
    component.filterByType('Regular');
    expect(component.selectedFilter).toBe('Regular');
    expect(component.filteredMembers.length).toBe(1);
    expect(component.filteredMembers[0].membershipType).toBe('Regular');
  });

  it('should filter honorary members', () => {
    component.filterByType('Honorary');
    expect(component.selectedFilter).toBe('Honorary');
    expect(component.filteredMembers.length).toBe(1);
    expect(component.filteredMembers[0].membershipType).toBe('Honorary');
  });

  it('should show all members when All filter is selected', () => {
    component.filterByType('Gold');
    component.filterByType('All');
    expect(component.selectedFilter).toBe('All');
    expect(component.filteredMembers.length).toBe(3);
  });

  it('should emit close event when onClose is called', () => {
    spyOn(component.closeModal, 'emit');
    component.onClose();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should close modal when backdrop is clicked', () => {
    spyOn(component.closeModal, 'emit');
    const event = {
      target: { classList: { contains: () => true } }
    } as any;
    component.onBackdropClick(event);
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should not close modal when clicking inside modal container', () => {
    spyOn(component.closeModal, 'emit');
    const event = {
      target: { classList: { contains: () => false } }
    } as any;
    component.onBackdropClick(event);
    expect(component.closeModal.emit).not.toHaveBeenCalled();
  });

  it('should return correct membership type label', () => {
    expect(component.getMembershipTypeLabel('Gold')).toBe('Zlatni član');
    expect(component.getMembershipTypeLabel('Regular')).toBe('Redovni član');
    expect(component.getMembershipTypeLabel('Honorary')).toBe('Počasni član');
  });

  it('should return correct badge class', () => {
    expect(component.getMembershipTypeBadgeClass('Gold')).toBe('badge-gold');
    expect(component.getMembershipTypeBadgeClass('Regular')).toBe('badge-regular');
    expect(component.getMembershipTypeBadgeClass('Honorary')).toBe('badge-honorary');
  });
});
