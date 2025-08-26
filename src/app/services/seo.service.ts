import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private baseUrl = 'https://podvelezje.ba';
  private defaultImage = 'https://podvelezje.ba/assets/images/logo/logo.png';
  private siteName = 'UG Podveležje';
  private defaultDescription = 'Udruženje Građana Podveležje - Čuvamo tradiciju i gradimo budućnost. Aktivno radimo na očuvanju kulturne baštine, zaštiti prirode i promociji turizma u Podveležju.';

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  updateSEO(data: SEOData): void {
    this.updateTitle(data.title);
    this.updateDescription(data.description);
    this.updateKeywords(data.keywords);
    this.updateOpenGraph(data);
    this.updateTwitterCard(data);
    this.updateCanonical(data.url);
  }

  private updateTitle(title?: string): void {
    const pageTitle = title ? `${title} | ${this.siteName}` : this.siteName;
    this.title.setTitle(pageTitle);
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
  }

  private updateDescription(description?: string): void {
    const desc = description || this.defaultDescription;
    this.meta.updateTag({ name: 'description', content: desc });
    this.meta.updateTag({ property: 'og:description', content: desc });
    this.meta.updateTag({ name: 'twitter:description', content: desc });
  }

  private updateKeywords(keywords?: string): void {
    if (keywords) {
      this.meta.updateTag({ name: 'keywords', content: keywords });
    }
  }

  private updateOpenGraph(data: SEOData): void {
    const url = data.url || this.getCurrentUrl();
    const image = data.image || this.defaultImage;
    const type = data.type || 'website';

    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ property: 'og:type', content: type });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:alt', content: data.title || this.siteName });
    this.meta.updateTag({ property: 'og:locale', content: 'bs_BA' });

    if (data.publishedTime) {
      this.meta.updateTag({ property: 'article:published_time', content: data.publishedTime });
    }
    if (data.modifiedTime) {
      this.meta.updateTag({ property: 'article:modified_time', content: data.modifiedTime });
    }
    if (data.author) {
      this.meta.updateTag({ property: 'article:author', content: data.author });
    }
    if (data.section) {
      this.meta.updateTag({ property: 'article:section', content: data.section });
    }
    if (data.tags) {
      data.tags.forEach(tag => {
        this.meta.addTag({ property: 'article:tag', content: tag });
      });
    }
  }

  private updateTwitterCard(data: SEOData): void {
    const image = data.image || this.defaultImage;

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:site', content: '@ug_podvelezje' });
    this.meta.updateTag({ name: 'twitter:creator', content: '@ug_podvelezje' });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({ name: 'twitter:image:alt', content: data.title || this.siteName });
  }

  private updateCanonical(url?: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const canonicalUrl = url || this.getCurrentUrl();
      
      let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
      if (link) {
        link.setAttribute('href', canonicalUrl);
      } else {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', canonicalUrl);
        document.head.appendChild(link);
      }
    }
  }

  private getCurrentUrl(): string {
    if (isPlatformBrowser(this.platformId)) {
      return window.location.href;
    }
    return `${this.baseUrl}${this.router.url}`;
  }

  updateGeographicMeta(): void {
    this.meta.updateTag({ name: 'geo.region', content: 'BA-BIH' });
    this.meta.updateTag({ name: 'geo.placename', content: 'Podvelezje, Bosnia and Herzegovina' });
    this.meta.updateTag({ name: 'geo.position', content: '43.2163;17.8908' });
    this.meta.updateTag({ name: 'ICBM', content: '43.2163, 17.8908' });
  }

  addHreflangTags(): void {
    if (isPlatformBrowser(this.platformId)) {
      const currentUrl = this.getCurrentUrl();
      
      const hreflangTags = [
        { lang: 'bs', url: currentUrl },
        { lang: 'bs-BA', url: currentUrl },
        { lang: 'x-default', url: currentUrl }
      ];

      hreflangTags.forEach(tag => {
        let link: HTMLLinkElement | null = document.querySelector(`link[hreflang="${tag.lang}"]`);
        if (link) {
          link.setAttribute('href', tag.url);
        } else {
          link = document.createElement('link');
          link.setAttribute('rel', 'alternate');
          link.setAttribute('hreflang', tag.lang);
          link.setAttribute('href', tag.url);
          document.head.appendChild(link);
        }
      });
    }
  }
}