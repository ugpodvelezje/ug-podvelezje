export interface Member {
  id: number;
  name: string;
  membershipType: 'Regular' | 'Gold' | 'Honorary';
  joinDate?: string;
}

export interface MembershipType {
  type: 'Regular' | 'Gold' | 'Honorary';
  label: string;
  description: string;
}
