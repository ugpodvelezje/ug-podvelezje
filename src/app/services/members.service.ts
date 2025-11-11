import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Member } from '../interfaces/member.interface';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  // Mock data - will be replaced with data from markdown file or database
  private members: Member[] = [
    // Gold Members
    { id: 1, name: 'Meho Mehic', membershipType: 'Gold' },

    // Regular Members
    { id: 2, name: 'Meho Mehic', membershipType: 'Regular' },

    // Honorary Members
    { id: 91, name: 'Dr. Meho Mehic', membershipType: 'Honorary' }
  ];

  constructor() { }

  /**
   * Get all members
   */
  getMembers(): Observable<Member[]> {
    return of(this.members);
  }

  /**
   * Get members by membership type
   */
  getMembersByType(type: 'Regular' | 'Gold' | 'Honorary'): Observable<Member[]> {
    const filteredMembers = this.members.filter(member => member.membershipType === type);
    return of(filteredMembers);
  }

  /**
   * Get member count by type
   */
  getMemberCountByType(type: 'Regular' | 'Gold' | 'Honorary'): number {
    return this.members.filter(member => member.membershipType === type).length;
  }

  /**
   * Get total member count
   */
  getTotalMemberCount(): number {
    return this.members.length;
  }

  /**
   * Get member statistics
   */
  getMemberStatistics(): { total: number; gold: number; regular: number; honorary: number } {
    return {
      total: this.members.length,
      gold: this.getMemberCountByType('Gold'),
      regular: this.getMemberCountByType('Regular'),
      honorary: this.getMemberCountByType('Honorary')
    };
  }
}
