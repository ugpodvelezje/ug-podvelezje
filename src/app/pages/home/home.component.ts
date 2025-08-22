import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { ActivatedRoute } from '@angular/router';
import { JoinUsComponent } from '../../components/join-us/join-us.component';
import { SeoService } from '../../services/seo.service';
import { StructuredDataService } from '../../services/structured-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, JoinUsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private route: ActivatedRoute,
    private seoService: SeoService,
    private structuredDataService: StructuredDataService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.updateSEO();
    // Fragment handling is now managed by navbar component
    // No need to handle fragments here anymore
  }

  private updateSEO(): void {
    this.seoService.updateSEO({
      title: 'Početna',
      description: 'Udruženje Građana Podveležje - Čuvamo tradiciju i gradimo budućnost. Aktivno radimo na očuvanju kulturne baštine, zaštiti prirode i promociji turizma u Podveležju.',
      keywords: 'Podveležje, Udruženje građana, Bosna i Hercegovina, kulturna baština, turizam, priroda, tradicija, zajednica, Herzegovina, UG Podvelezje',
      url: 'https://podvelezje.ba',
      type: 'website'
    });

    this.seoService.updateGeographicMeta();
    this.seoService.addHreflangTags();
    
    this.structuredDataService.addOrganizationData();
    this.structuredDataService.addLocalBusinessData();
    this.structuredDataService.addWebsiteData();
    this.structuredDataService.addTouristAttractionData();
  }
}
