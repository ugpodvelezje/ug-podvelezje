import { Component, OnInit, OnDestroy, inject, signal, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeroSlideshowService, HeroImage } from '../../services/hero-slideshow.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
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
  readonly slideTransitionTime = 800; // 0.8 seconds
  
  // For managing animation states
  isFading = signal<boolean>(false);
  nextImage = signal<HeroImage | null>(null); // Store the next image to preload
  
  // Subtitle management
  private subtitles = [
    'Čuvamo tradiciju i gradimo budućnost',
    'Povezujemo zajednicu kroz vrijednosti', 
    'Zajedno stvaramo bolje sutra'
  ];
  private subtitleInterval?: number;
  private subtitleIndex = 0;
  currentSubtitle = signal<string>(this.subtitles[0]);
  isSubtitleVisible = signal<boolean>(false);
  
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  
  ngOnInit(): void {
    // Start the slideshow only in browser environment
    if (this.isBrowser) {
      this.startSlideshow();
      this.startSubtitleAnimation();
    }
  }
  
  ngOnDestroy(): void {
    // Clean up the interval when component is destroyed
    if (this.isBrowser) {
      this.stopSlideshow();
      this.stopSubtitleAnimation();
    }
  }
  
  scrollToSection(sectionId: string): void {
    if (!this.isBrowser) return;
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        // Check if it's a mobile device (screen width < 768px)
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
          // On mobile, scroll to a position that hides the hero section completely
          const elementTop = element.offsetTop;
          const heroHeight = window.innerHeight - 70; // Full viewport minus navbar
          const targetPosition = Math.max(elementTop - 70, heroHeight);
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        } else {
          // On desktop, use normal scroll behavior
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 100);
  }
  
  private startSlideshow(): void {
    if (!this.isBrowser) return;
    
    // Pre-calculate next image for smoother transitions
    const preloadNextImage = () => {
      // Get the next image that will be shown
      const currentIndex = this.slideshowService.activeIndex();
      const images = this.slideshowService.images();
      const nextIndex = (currentIndex + 1) % images.length;
      this.nextImage.set(images[nextIndex]);
      
      // Preload the image
      if (this.isBrowser && this.nextImage()) {
        const img = new Image();
        img.src = this.nextImage()!.url;
      }
    };
    
    // Initial preload of the next image
    preloadNextImage();
    
    this.slideshowInterval = window.setInterval(() => {
      // Preload the next image before starting transition
      preloadNextImage();
      
      // Start slide transition
      this.isFading.set(true);
      
      // Wait for slide-out animation to complete
      setTimeout(() => {
        // Advance to next image
        this.slideshowService.nextImage();
        this.currentImage.set(this.slideshowService.getCurrentImage());
        
        // Reset slide state
        this.isFading.set(false);
      }, this.slideTransitionTime);
    }, this.slideshowDelay);
  }
  
  private stopSlideshow(): void {
    if (!this.isBrowser) return;
    
    if (this.slideshowInterval) {
      clearInterval(this.slideshowInterval);
    }
  }
  
  private startSubtitleAnimation(): void {
    if (!this.isBrowser) return;
    
    // Start with first subtitle visible after a brief delay
    setTimeout(() => {
      this.isSubtitleVisible.set(true);
    }, 1000);
    
    // Cycle through subtitles every 4 seconds
    this.subtitleInterval = window.setInterval(() => {
      // Hide current subtitle
      this.isSubtitleVisible.set(false);
      
      // Wait for hide animation, then change subtitle and show
      setTimeout(() => {
        this.subtitleIndex = (this.subtitleIndex + 1) % this.subtitles.length;
        this.currentSubtitle.set(this.subtitles[this.subtitleIndex]);
        this.isSubtitleVisible.set(true);
      }, 500); // Half second for hide animation
    }, 4000);
  }
  
  private stopSubtitleAnimation(): void {
    if (!this.isBrowser) return;
    
    if (this.subtitleInterval) {
      clearInterval(this.subtitleInterval);
    }
  }
}
