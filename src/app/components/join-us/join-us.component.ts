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
  public currentSlide = 0;
  public visibleSlides = 3;
  private autoSlideInterval?: number;
  private browserService = inject(BrowserService);
  private isTransitioning = false;
  private elementRef = inject(ElementRef);
  private statisticsAnimated = false;

  // Statistics data
  public yearsOfWork = 1; // Founded in 2024
  public totalMembers = 1500;
  public goldSponsors = 20;
  public facebookFollowers = 4100;

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
      title: 'Networking',
      description: 'Povezivanje sa drugim članovima i stvaranje vrijednih kontakata.'
    },
    {
      icon: 'eco',
      title: 'Održivost',
      description: 'Doprinos održivom razvoju i očuvanju prirodnih resursa našeg područja.'
    }
  ];

  // Create a getter for the displayed partners that includes duplicates for infinite scrolling
  public get displayedPartners(): Partner[] {
    // Duplicate the partners array to create a seamless infinite scroll effect
    return [...this.partners, ...this.partners, ...this.partners];
  }

  public partners: Partner[] = [
    {
      name: 'Grad Mostar',
      logo: '/assets/images/partners/grad-mostar-logo.jpg'
    },
    {
      name: 'Turistička Zajednica HNK',
      logo: '/assets/images/partners/turisticka-zajednica-hnk-logo.jpg'
    },
    {
      name: 'Memic dekor',
      logo: '/assets/images/partners/memic-dekor-logo.jpg'
    },
    {
      name: 'BH Telecom',
      logo: '/assets/images/partners/bh-telecom-logo.jpg'
    },
    {
      name: 'Federalno Ministarstvo Okoliša i Turizma',
      logo: '/assets/images/partners/fedministartstvookolisa-logo.jpg'
    }
  ];

  public get totalSlides(): number[] {
    return Array(this.partners.length).fill(0).map((_, i) => i);
  }

  public get transformValue(): string {
    const slideWidth = 100 / this.visibleSlides;
    const offset = this.partners.length * slideWidth; // One full set of partners
    return `translateX(-${offset + (this.currentSlide * slideWidth)}%)`;
  }

  ngOnInit(): void {
    this.updateVisibleSlides();
    this.startAutoSlide();
    this.browserService.addEventListener('resize', this.updateVisibleSlides.bind(this));
  }

  ngAfterViewInit(): void {
    // Only setup intersection observer if we're in browser environment
    if (this.browserService.getWindow()) {
      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy(): void {
    if (this.autoSlideInterval) {
      this.browserService.clearInterval(this.autoSlideInterval);
    }
    this.browserService.removeEventListener('resize', this.updateVisibleSlides.bind(this));
  }

  private updateVisibleSlides(): void {
    this.visibleSlides = this.browserService.getInnerWidth() < 768 ? 1 : 3;
  }

  private startAutoSlide(): void {
    if (this.autoSlideInterval) {
      this.browserService.clearInterval(this.autoSlideInterval);
    }
    this.autoSlideInterval = this.browserService.setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  public nextSlide(): void {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    this.currentSlide++;

    // Let it continue sliding through all sets
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
    
    this.startAutoSlide();
  }

  public prevSlide(): void {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    this.currentSlide--;

    // Let it continue sliding through all sets
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
    
    this.startAutoSlide();
  }

  public goToSlide(index: number): void {
    if (this.isTransitioning) return;
    this.currentSlide = index;
    this.startAutoSlide();
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
