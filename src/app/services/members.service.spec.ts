import { TestBed } from '@angular/core/testing';
import { MembersService } from './members.service';

describe('MembersService', () => {
  let service: MembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all members', (done) => {
    service.getMembers().subscribe(members => {
      expect(members.length).toBeGreaterThan(0);
      expect(members.length).toBe(95);
      done();
    });
  });

  it('should return gold members', (done) => {
    service.getMembersByType('Gold').subscribe(members => {
      expect(members.length).toBe(21);
      expect(members.every(m => m.membershipType === 'Gold')).toBe(true);
      done();
    });
  });

  it('should return regular members', (done) => {
    service.getMembersByType('Regular').subscribe(members => {
      expect(members.length).toBe(69);
      expect(members.every(m => m.membershipType === 'Regular')).toBe(true);
      done();
    });
  });

  it('should return honorary members', (done) => {
    service.getMembersByType('Honorary').subscribe(members => {
      expect(members.length).toBe(5);
      expect(members.every(m => m.membershipType === 'Honorary')).toBe(true);
      done();
    });
  });

  it('should return correct member count statistics', () => {
    const stats = service.getMemberStatistics();
    expect(stats.total).toBe(95);
    expect(stats.gold).toBe(21);
    expect(stats.regular).toBe(69);
    expect(stats.honorary).toBe(5);
  });

  it('should return correct total member count', () => {
    expect(service.getTotalMemberCount()).toBe(95);
  });

  it('should return correct count for each membership type', () => {
    expect(service.getMemberCountByType('Gold')).toBe(21);
    expect(service.getMemberCountByType('Regular')).toBe(69);
    expect(service.getMemberCountByType('Honorary')).toBe(5);
  });
});
