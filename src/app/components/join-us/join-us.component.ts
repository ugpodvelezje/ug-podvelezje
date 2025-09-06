import { Component, OnInit, OnDestroy, inject, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserService } from '../../services/browser.service';

interface Partner {
  name: string;
  logo: string;
}

interface MembershipBenefit {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-join-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.scss']
})
export class JoinUsComponent implements OnInit, OnDestroy, AfterViewInit {
  public currentOffset = 0;
  public visibleSlides = 3;
  private autoScrollInterval?: number;
  private browserService = inject(BrowserService);
  private isTransitioning = false;
  private elementRef = inject(ElementRef);
  private statisticsAnimated = false;
  private scrollSpeed = 0.5; // pixels per frame
  private cardWidth = 0;
  private isPaused = false;

  // Statistics data
  public yearsOfWork = 1; // Founded in 2024
  public totalMembers = 477;
  public goldSponsors = 83;
  public facebookFollowers = 4200;

  // Animated values
  public animatedYears = 0;
  public animatedMembers = 0;
  public animatedSponsors = 0;
  public animatedFollowers = 0;

  public benefits: MembershipBenefit[] = [
    {
      icon: 'diversity_3',
      title: 'Zajednica',
      description: 'Postanite dio aktivne zajednice koja radi na očuvanju i unapređenju našeg kraja.'
    },
    {
      icon: 'volunteer_activism',
      title: 'Volontiranje',
      description: 'Prilike za volontiranje i direktno učešće u projektima koji mijenjaju našu zajednicu.'
    },
    {
      icon: 'event',
      title: 'Događaji',
      description: 'Pristup ekskluzivnim događajima, radionicama i kulturnim manifestacijama.'
    },
    {
      icon: 'school',
      title: 'Edukacija',
      description: 'Mogućnosti za učenje, razmjenu znanja i profesionalni razvoj.'
    },
    {
      icon: 'groups',
      title: 'Povezivanje',
      description: 'Povezivanje sa drugim članovima i stvaranje vrijednih kontakata.'
    },
    {
      icon: 'eco',
      title: 'Održivost',
      description: 'Doprinos održivom razvoju i očuvanju prirodnih resursa našeg područja.'
    }
  ];

  // Create a continuous loop of partners for smooth scrolling
  public get allPartnersForDisplay(): Partner[] {
    // Triple the partners array to create seamless loop
    return [...this.partners, ...this.partners, ...this.partners];
  }

  public partners: Partner[] = [
    {
      name: 'Skupština HNK',
      logo: 'https://podvelezje.ba/assets/images/partners/skupstina-hnk.png'
    },
    {
      name: 'Hercegovinalijek',
      logo: 'https://podvelezje.ba/assets/images/partners/herecgovina-lijek.png'
    },
    {
      name: 'Izgradnja Tojaga',
      logo: 'https://podvelezje.ba/assets/images/partners/izgradnja-tojaga.png'
    },
    {
      name: 'Amitea',
      logo: 'https://podvelezje.ba/assets/images/partners/amitea.png'
    },
    {
      name: 'Amicus Hotel',
      logo: 'https://podvelezje.ba/assets/images/partners/amicus-hotel-logo.png'
    },

    {
      name: 'Salon namještaja Royal',
      logo: 'https://podvelezje.ba/assets/images/partners/royal-namjestaj.jpg'
    },
    {
      name: 'HA Hotel',
      logo: 'https://podvelezje.ba/assets/images/partners/ha-hotel.png'
    },
    {
      name: 'Adapt 12',
      logo: 'https://podvelezje.ba/assets/images/partners/adapt-12.png'
    },
    {
      name: 'Hercegovinapromet',
      logo: 'https://podvelezje.ba/assets/images/partners/hercegovinapromet.png'
    }
  ];


  public get transformValue(): string {
    return `translateX(-${this.currentOffset}px)`;
  }

  ngOnInit(): void {
    this.updateVisibleSlides();
    this.calculateCardWidth();
    this.startAutoScroll();
    this.browserService.addEventListener('resize', this.onResize.bind(this));
  }

  ngAfterViewInit(): void {
    // Only setup intersection observer if we're in browser environment
    if (this.browserService.getWindow()) {
      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy(): void {
    if (this.autoScrollInterval) {
      this.browserService.clearInterval(this.autoScrollInterval);
    }
    this.browserService.removeEventListener('resize', this.onResize.bind(this));
  }

  private updateVisibleSlides(): void {
    this.visibleSlides = this.browserService.getInnerWidth() < 768 ? 1 : 3;
  }

  private onResize(): void {
    this.updateVisibleSlides();
    this.calculateCardWidth();
  }

  private calculateCardWidth(): void {
    const containerWidth = this.browserService.getInnerWidth();
    const padding = containerWidth < 768 ? 32 : 96; // Account for container padding
    this.cardWidth = (containerWidth - padding) / this.visibleSlides;
  }

  private startAutoScroll(): void {
    if (this.autoScrollInterval) {
      this.browserService.clearInterval(this.autoScrollInterval);
    }
    
    this.autoScrollInterval = this.browserService.setInterval(() => {
      if (!this.isPaused) {
        this.currentOffset += this.scrollSpeed;
        
        // Reset position when we've scrolled through one full set
        const maxOffset = this.partners.length * this.cardWidth;
        if (this.currentOffset >= maxOffset) {
          this.currentOffset = 0;
        }
      }
    }, 16); // ~60fps
  }

  public nextSlide(): void {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    this.isPaused = true;
    
    // Slower forward scroll - adjust multiplier for speed (1 = one card width)
    this.currentOffset += this.cardWidth * 1;
    const maxOffset = this.partners.length * this.cardWidth;
    if (this.currentOffset >= maxOffset) {
      this.currentOffset = this.currentOffset - maxOffset;
    }

    setTimeout(() => {
      this.isTransitioning = false;
      this.isPaused = false;
    }, 400);
  }

  public prevSlide(): void {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    this.isPaused = true;
    
    // Slower backward scroll - adjust multiplier for speed (1 = one card width)
    this.currentOffset -= this.cardWidth * 1;
    if (this.currentOffset < 0) {
      this.currentOffset = this.partners.length * this.cardWidth + this.currentOffset;
    }

    setTimeout(() => {
      this.isTransitioning = false;
      this.isPaused = false;
    }, 400);
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.statisticsAnimated) {
          this.animateStatistics();
          this.statisticsAnimated = true;
        }
      });
    }, options);

    const statisticsSection = this.elementRef.nativeElement.querySelector('.statistics-section');
    if (statisticsSection) {
      observer.observe(statisticsSection);
    }
  }

  private animateStatistics(): void {
    this.animateNumber('animatedYears', this.yearsOfWork, 2024);
    this.animateNumber('animatedMembers', this.totalMembers, 2500);
    this.animateNumber('animatedSponsors', this.goldSponsors, 1500);
    this.animateNumber('animatedFollowers', this.facebookFollowers, 3000);
  }

  private animateNumber(property: keyof this, target: number, duration: number): void {
    const startValue = 0;
    const increment = target / (duration / 16); // 16ms per frame (60fps)
    let currentValue = startValue;

    const animate = () => {
      currentValue += increment;
      if (currentValue >= target) {
        (this as any)[property] = target;
        return;
      }
      (this as any)[property] = Math.floor(currentValue);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }
}
