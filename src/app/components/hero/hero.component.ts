import { Component, OnInit, OnDestroy, inject, signal, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroSlideshowService, HeroImage } from '../../services/hero-slideshow.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, OnDestroy {
  private slideshowService = inject(HeroSlideshowService);
  private slideshowInterval?: number;
  private isBrowser: boolean;
  
  // Reactive signals for managing state
  readonly images = this.slideshowService.images;
  readonly activeIndex = this.slideshowService.activeIndex;
  readonly currentImage = signal<HeroImage>(this.slideshowService.getCurrentImage());
  
  // Configure slideshow settings
  readonly slideshowDelay = 5000; // 5 seconds
  readonly fadeTransitionTime = 500; // 0.5 seconds
  
  // For managing animation states
  isFading = signal<boolean>(false);
  
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  
  ngOnInit(): void {
    // Start the slideshow only in browser environment
    if (this.isBrowser) {
      this.startSlideshow();
    }
  }
  
  ngOnDestroy(): void {
    // Clean up the interval when component is destroyed
    if (this.isBrowser) {
      this.stopSlideshow();
    }
  }
  
  scrollToSection(sectionId: string): void {
    if (!this.isBrowser) return;
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
  
  private startSlideshow(): void {
    if (!this.isBrowser) return;
    
    this.slideshowInterval = window.setInterval(() => {
      this.isFading.set(true);
      
      // Wait for fadeout animation
      setTimeout(() => {
        // Advance to next image
        this.slideshowService.nextImage();
        this.currentImage.set(this.slideshowService.getCurrentImage());
        
        // Reset fade state
        this.isFading.set(false);
      }, this.fadeTransitionTime);
    }, this.slideshowDelay);
  }
  
  private stopSlideshow(): void {
    if (!this.isBrowser) return;
    
    if (this.slideshowInterval) {
      clearInterval(this.slideshowInterval);
    }
  }
}
