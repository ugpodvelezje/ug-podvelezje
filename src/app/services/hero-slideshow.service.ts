import { Injectable, signal } from '@angular/core';

export interface HeroImage {
  url: string;
  alt: string;
}

@Injectable({
  providedIn: 'root'
})
export class HeroSlideshowService {
  // Using signals for reactive state management
  // Note: Add these image files to the assets/images directory
  // or replace with your actual image paths
  private heroImages = signal<HeroImage[]>([
    {
      url: 'https://podvelezje.ba/assets/images/hero-section/cover.jpg',
      alt: 'View of Podvelezje landscape'
    },
    {
      url: 'https://podvelezje.ba/assets/images/hero-section/podvelezje-1.jpg',
      alt: 'Podvelezje scenery'
    },
    {
      url: 'https://podvelezje.ba/assets/images/hero-section/podvelezje-2.jpg',
      alt: 'Podvelezje community'
    },
    {
      url: 'https://podvelezje.ba/assets/images/hero-section/podvelezje-dzamija.jpg',
      alt: 'Podvelezje mosque'
    }
  ]);

  private currentImageIndex = signal<number>(0);
  
  // Public getters using signals
  public readonly images = this.heroImages.asReadonly();
  public readonly activeIndex = this.currentImageIndex.asReadonly();
  
  constructor() { }
  
  // Method to get the current active image
  public getCurrentImage(): HeroImage {
    return this.heroImages()[this.currentImageIndex()];
  }
  
  // Method to advance to the next image
  public nextImage(): void {
    const nextIndex = (this.currentImageIndex() + 1) % this.heroImages().length;
    this.currentImageIndex.set(nextIndex);
  }
  
  // Method to go to the previous image
  public previousImage(): void {
    const prevIndex = this.currentImageIndex() === 0 
      ? this.heroImages().length - 1 
      : this.currentImageIndex() - 1;
    this.currentImageIndex.set(prevIndex);
  }
  
  // Method to set a specific image by index
  public setImage(index: number): void {
    if (index >= 0 && index < this.heroImages().length) {
      this.currentImageIndex.set(index);
    }
  }
}
