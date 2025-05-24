import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../interfaces/project.interface';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects$!: Observable<Project[]>;
  private projectsArray: Project[] = [];
  activeTab: 'completed' | 'ongoing' | 'planned' = 'ongoing';
  categories: string[] = ['Sve', 'Infrastruktura', 'Obrazovanje', 'Okoliš'];
  selectedCategory: string = 'Sve';

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    // First get projects by status
    this.projects$ = this.projectsService.getProjectsByStatus(this.activeTab).pipe(
      map(projects => {
        // Then filter by category if not 'All'
        if (this.selectedCategory !== 'Sve') {
          return projects.filter(project => project.category === this.selectedCategory);
        }
        return projects;
      })
    );

    // Update the projectsArray for image error handling
    this.projects$.subscribe(projects => {
      this.projectsArray = projects;
    });
  }

  setActiveTab(tab: 'completed' | 'ongoing' | 'planned'): void {
    this.activeTab = tab;
    this.loadProjects();
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
    this.loadProjects();
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    const projectCard = img.closest('.project-card');
    if (projectCard) {
      const projectId = projectCard.getAttribute('href')?.split('/').pop();
      const project = this.projectsArray.find(p => p.id === projectId);
      if (project) {
        project.hasImageError = true;
      }
    }
  }
} 