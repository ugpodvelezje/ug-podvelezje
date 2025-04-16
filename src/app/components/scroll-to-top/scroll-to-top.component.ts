import { Component, HostListener, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      *ngIf="isVisible" 
      class="scroll-to-top" 
      (click)="scrollToTop()"
      [@fadeInOut]="isVisible"
      aria-label="Scroll to top">
      <i class="fas fa-chevron-up"></i>
    </button>
  `,
  styleUrls: ['./scroll-to-top.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ScrollToTopComponent implements OnInit {
  isVisible = false;
  private scrollThreshold = 400; // Show button after scrolling 400px
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.checkScroll();
    }
  }

  @HostListener('window:scroll')
  checkScroll() {
    if (this.isBrowser) {
      this.isVisible = window.pageYOffset > this.scrollThreshold;
    }
  }

  scrollToTop() {
    if (this.isBrowser) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
} 