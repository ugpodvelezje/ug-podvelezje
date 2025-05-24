export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'ongoing' | 'planned';
  imageUrl: string;
  completionDate?: Date;
  category: string;
  hasImageError?: boolean;
} 