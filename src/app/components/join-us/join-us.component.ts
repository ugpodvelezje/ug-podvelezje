import { Component, OnInit, OnDestroy, inject } from '@angular/core';
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
export class JoinUsComponent implements OnInit, OnDestroy {
  public currentSlide = 0;
  public visibleSlides = 3;
  private autoSlideInterval?: number;
  private browserService = inject(BrowserService);

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

  public partners: Partner[] = [
    {
      name: 'Grad Mostar',
      logo: '/assets/images/partners/mostar-logo.png'
    },
    {
      name: 'Turistička Zajednica HNK',
      logo: '/assets/images/partners/tz-hnk-logo.png'
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
      logo: '/assets/images/partners/fmoit-logo.png'
    }
  ];

  public get totalSlides(): number[] {
    const total = Math.ceil(this.partners.length / this.visibleSlides);
    return Array(total).fill(0).map((_, i) => i);
  }

  public get transformValue(): string {
    return `translateX(-${this.currentSlide * (100 / this.visibleSlides)}%)`;
  }

  ngOnInit(): void {
    this.updateVisibleSlides();
    this.startAutoSlide();
    this.browserService.addEventListener('resize', this.updateVisibleSlides.bind(this));
  }

  ngOnDestroy(): void {
    if (this.autoSlideInterval) {
      this.browserService.clearInterval(this.autoSlideInterval);
    }
    this.browserService.removeEventListener('resize', this.updateVisibleSlides.bind(this));
  }

  private updateVisibleSlides(): void {
    this.visibleSlides = this.browserService.getInnerWidth() < 768 ? 1 : 3;
    this.currentSlide = 0; // Reset to first slide when changing view
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
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides.length;
  }

  public prevSlide(): void {
    this.currentSlide = this.currentSlide === 0 
      ? this.totalSlides.length - 1 
      : this.currentSlide - 1;
  }

  public goToSlide(index: number): void {
    this.currentSlide = index;
    this.startAutoSlide(); // Reset the interval
  }
}
