import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../interfaces/project.interface';
import { Observable, map, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project$!: Observable<Project>;

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    // Get the project ID from the route parameter and fetch the project
    this.project$ = this.route.paramMap.pipe(
      map(params => params.get('id') || ''),
      switchMap(id => this.projectsService.getProjectById(id))
    );
  }

  formatParagraph(text: string): string {
    return text.replace(/•/g, '&#8226;');
  }

  shareProject() {
    this.project$.pipe(take(1)).subscribe(project => {
      if (navigator.share) {
        navigator.share({
          title: project?.title || 'Project Details',
          text: project?.description || '',
          url: window.location.href
        }).catch((error) => console.log('Error sharing:', error));
      } else {
        // Fallback for browsers that don't support Web Share API
        const dummy = document.createElement('textarea');
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        
        // Show feedback (you might want to use a proper notification service)
        alert('Link copied to clipboard!');
      }
    });
  }
} 