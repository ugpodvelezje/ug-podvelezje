import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private mockProjects: Project[] = [
    {
      id: '1',
      title: 'Community Center Renovation',
      description: `Our flagship project focused on renovating the heart of our community. The renovation included modernizing the main hall, creating new multipurpose rooms, and installing state-of-the-art audio-visual equipment.

The project aimed to create a welcoming space that serves multiple community needs:
• A modern conference room for community meetings and educational workshops
• A fully equipped kitchen for community events and cooking classes
• An expanded library section with digital resources
• A youth activity center with modern amenities
• Improved accessibility features throughout the building

The renovation has significantly increased the center's capacity to host various community events and has become a model for sustainable community development in the region.`,
      status: 'completed',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      completionDate: new Date('2023-12-15'),
      category: 'Infrastruktura'
    },
    {
      id: '2',
      title: 'Youth Sports Program',
      description: `An innovative program designed to promote physical activity and team spirit among our local youth. This ongoing initiative encompasses multiple sports disciplines and activities.

Key Program Components:
• Weekly soccer training sessions with qualified coaches
• Basketball workshops and local tournament organization
• Traditional sports preservation and promotion
• Monthly fitness challenges and health education
• Inter-community sports exchanges and friendships

The program has already shown positive results in:
• Increased youth participation in sports activities
• Improved physical fitness among participants
• Stronger community bonds through sports
• Development of leadership skills
• Promotion of healthy lifestyle choices

We continue to expand the program with new activities and partnerships to reach more young people in our community.`,
      status: 'ongoing',
      imageUrl: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      category: 'Obrazovanje'
    },
    {
      id: '3',
      title: 'Green City Initiative',
      description: `An ambitious environmental project aimed at transforming our urban spaces into greener, more sustainable areas. This comprehensive initiative will create lasting positive impact on our environment.

Planned Activities:
• Planting 1000+ native trees across the city
• Creating new community gardens and green spaces
• Installing solar-powered lighting in public areas
• Implementing a community recycling program
• Developing educational programs about environmental conservation

Expected Outcomes:
• Improved air quality and reduced urban heat island effect
• Enhanced biodiversity in urban areas
• Greater community engagement in environmental issues
• Reduced energy consumption in public spaces
• Creation of sustainable urban farming opportunities

The initiative will be implemented in phases over the next two years, with community participation at its core.`,
      status: 'planned',
      imageUrl: 'https://images.unsplash.com/photo-1492496913980-501348b61469?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      category: 'Okoliš'
    }
  ];

  constructor() { }

  getAllProjects(): Observable<Project[]> {
    return of(this.mockProjects);
  }

  getProjectsByCategory(category: string): Observable<Project[]> {
    return of(this.mockProjects.filter(project => project.category === category));
  }

  getProjectsByStatus(status: 'completed' | 'ongoing' | 'planned'): Observable<Project[]> {
    return of(this.mockProjects.filter(project => project.status === status));
  }

  getFeaturedProjects(): Observable<Project[]> {
    return of(this.mockProjects.slice(0, 3));
  }

  getProjectById(id: string): Observable<Project> {
    const project = this.mockProjects.find(p => p.id === id);
    if (!project) {
      throw new Error(`Project with id ${id} not found`);
    }
    return of(project);
  }
} 