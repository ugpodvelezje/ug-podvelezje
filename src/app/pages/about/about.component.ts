import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { StructuredDataService } from '../../services/structured-data.service';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {

  constructor(
    private seoService: SeoService,
    private structuredDataService: StructuredDataService
  ) {}

  ngOnInit(): void {
    this.updateSEO();
  }

  private updateSEO(): void {
    this.seoService.updateSEO({
      title: 'O nama',
      description: 'Saznajte više o Udruženju Građana Podveležje, našoj historiji, misiji i viziji. Radimo na očuvanju kulturne baštine, zaštiti prirode i promociji turizma u Podveležju.',
      keywords: 'O nama, UG Podvelezje, historia, misija, vizija, kulturna baština, Podvelezje istorija, udruženje građana',
      url: 'https://podvelezje.ba/about',
      type: 'website'
    });

    this.structuredDataService.addBreadcrumbData([
      { name: 'Početna', url: 'https://podvelezje.ba' },
      { name: 'O nama', url: 'https://podvelezje.ba/about' }
    ]);
  }
}
