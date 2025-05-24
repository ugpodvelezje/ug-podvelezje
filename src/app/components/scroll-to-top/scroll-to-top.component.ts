import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { BrowserService } from '../../services/browser.service';

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
export class ScrollToTopComponent implements OnInit, OnDestroy {
  isVisible = false;
  private scrollThreshold = 400; // Show button after scrolling 400px
  private scrollHandler: any = null;

  constructor(private browserService: BrowserService) {}

  ngOnInit() {
    // Initial check
    this.checkScroll();
    
    // Add scroll event listener
    this.scrollHandler = this.checkScroll.bind(this);
    this.browserService.addEventListener('scroll', this.scrollHandler);
  }

  ngOnDestroy() {
    // Clean up scroll event listener
    if (this.scrollHandler) {
      this.browserService.removeEventListener('scroll', this.scrollHandler);
    }
  }

  checkScroll() {
    this.isVisible = this.browserService.getPageYOffset() > this.scrollThreshold;
  }

  scrollToTop() {
    this.browserService.scrollToTop();
  }
} 