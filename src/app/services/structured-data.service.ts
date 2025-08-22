import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { News } from '../interfaces/news.interface';

export interface OrganizationData {
  name: string;
  description: string;
  url: string;
  logo: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint: {
    telephone: string;
    contactType: string;
    email: string;
  };
  sameAs: string[];
}

@Injectable({
  providedIn: 'root'
})
export class StructuredDataService {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  addOrganizationData(): void {
    const organizationData: OrganizationData = {
      name: 'Udruženje Građana "Podvelezje"',
      description: 'Udruženje građana koje radi na očuvanju kulturne baštine, zaštiti prirode i promociji turizma u Podveležju, Bosna i Hercegovina.',
      url: 'https://podvelezje.ba',
      logo: 'https://podvelezje.ba/assets/images/logo/logo.png',
      address: {
        streetAddress: 'Podvelezje bb',
        addressLocality: 'Podvelezje',
        addressRegion: 'Herzegovina-Neretva Canton',
        postalCode: '88220',
        addressCountry: 'BA'
      },
      contactPoint: {
        telephone: '+387-36-XXX-XXX',
        contactType: 'customer service',
        email: 'info@podvelezje.ba'
      },
      sameAs: [
        'https://www.facebook.com/profile.php?id=100064833872953',
        'https://www.instagram.com/ug_podvelezje/',
        'https://www.youtube.com/channel/UCvJJV_d18akBSDe3irJ2LCA'
      ]
    };

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://podvelezje.ba/#organization',
      name: organizationData.name,
      alternateName: 'UG Podvelezje',
      description: organizationData.description,
      url: organizationData.url,
      logo: {
        '@type': 'ImageObject',
        url: organizationData.logo,
        width: 200,
        height: 200
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: organizationData.address.streetAddress,
        addressLocality: organizationData.address.addressLocality,
        addressRegion: organizationData.address.addressRegion,
        postalCode: organizationData.address.postalCode,
        addressCountry: organizationData.address.addressCountry
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: organizationData.contactPoint.telephone,
        contactType: organizationData.contactPoint.contactType,
        email: organizationData.contactPoint.email,
        availableLanguage: ['bs', 'hr', 'sr', 'en']
      },
      sameAs: organizationData.sameAs,
      foundingDate: '2020',
      memberOf: {
        '@type': 'Organization',
        name: 'Bosnia and Herzegovina NGO Sector'
      },
      areaServed: {
        '@type': 'Place',
        name: 'Podvelezje, Bosnia and Herzegovina'
      },
      knowsAbout: [
        'Cultural Heritage Preservation',
        'Environmental Protection',
        'Tourism Promotion',
        'Community Development',
        'Local History'
      ]
    };

    this.insertJsonLd(jsonLd, 'organization-jsonld');
  }

  addLocalBusinessData(): void {
    const localBusiness = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://podvelezje.ba/#localbusiness',
      name: 'Udruženje Građana "Podvelezje"',
      description: 'Lokalno udruženje građana u Podveležju koje se bavi očuvanjem tradicije i razvojem zajednice.',
      image: 'https://podvelezje.ba/assets/images/logo/logo.png',
      url: 'https://podvelezje.ba',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Podvelezje bb',
        addressLocality: 'Podvelezje',
        addressRegion: 'Herzegovina-Neretva Canton',
        postalCode: '88220',
        addressCountry: 'BA'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 43.2163,
        longitude: 17.8908
      },
      telephone: '+387-36-XXX-XXX',
      email: 'info@podvelezje.ba',
      sameAs: [
        'https://www.facebook.com/profile.php?id=100064833872953',
        'https://www.instagram.com/ug_podvelezje/',
        'https://www.youtube.com/channel/UCvJJV_d18akBSDe3irJ2LCA'
      ],
      priceRange: 'Free membership available',
      areaServed: {
        '@type': 'Place',
        name: 'Podvelezje, Bosnia and Herzegovina'
      }
    };

    this.insertJsonLd(localBusiness, 'localbusiness-jsonld');
  }

  addNewsArticleData(news: News, url: string): void {
    const article = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      '@id': url,
      headline: news.title,
      description: news.excerpt,
      image: {
        '@type': 'ImageObject',
        url: news.imageUrl,
        width: 800,
        height: 600
      },
      datePublished: news.publishDate.toISOString(),
      dateModified: news.publishDate.toISOString(),
      author: {
        '@type': 'Organization',
        name: news.author,
        url: 'https://podvelezje.ba'
      },
      publisher: {
        '@type': 'Organization',
        name: 'UG Podvelezje',
        logo: {
          '@type': 'ImageObject',
          url: 'https://podvelezje.ba/assets/images/logo/logo.png',
          width: 200,
          height: 200
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url
      },
      articleSection: 'News',
      inLanguage: 'bs-BA',
      about: {
        '@type': 'Thing',
        name: 'Podvelezje Community News'
      },
      keywords: news.tags?.join(', ') || 'Podvelezje, Bosnia Herzegovina, Community, News'
    };

    this.insertJsonLd(article, 'article-jsonld');
  }

  addWebsiteData(): void {
    const website = {
      '@context': 'https://schema.org',
      '@type': 'Website',
      '@id': 'https://podvelezje.ba/#website',
      name: 'UG Podvelezje',
      alternateName: 'Udruženje Građana Podvelezje',
      description: 'Službena web stranica Udruženja Građana Podveležje - Čuvamo tradiciju i gradimo budućnost',
      url: 'https://podvelezje.ba',
      inLanguage: 'bs-BA',
      publisher: {
        '@id': 'https://podvelezje.ba/#organization'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://podvelezje.ba/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      },
      sameAs: [
        'https://www.facebook.com/profile.php?id=100064833872953',
        'https://www.instagram.com/ug_podvelezje/',
        'https://www.youtube.com/channel/UCvJJV_d18akBSDe3irJ2LCA'
      ]
    };

    this.insertJsonLd(website, 'website-jsonld');
  }

  addBreadcrumbData(breadcrumbs: Array<{name: string, url: string}>): void {
    const breadcrumbList = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    };

    this.insertJsonLd(breadcrumbList, 'breadcrumb-jsonld');
  }

  addTouristAttractionData(): void {
    const attraction = {
      '@context': 'https://schema.org',
      '@type': 'TouristAttraction',
      name: 'Podvelezje',
      description: 'Historically significant area in Bosnia and Herzegovina known for its cultural heritage and natural beauty.',
      image: 'https://podvelezje.ba/assets/images/logo/logo.png',
      url: 'https://podvelezje.ba',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Podvelezje',
        addressRegion: 'Herzegovina-Neretva Canton',
        addressCountry: 'BA'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 43.2163,
        longitude: 17.8908
      },
      touristType: ['Cultural Tourism', 'Heritage Tourism', 'Nature Tourism'],
      isAccessibleForFree: true,
      availableLanguage: ['bs', 'hr', 'sr', 'en']
    };

    this.insertJsonLd(attraction, 'tourist-attraction-jsonld');
  }

  private insertJsonLd(data: any, id: string): void {
    if (isPlatformBrowser(this.platformId)) {
      let script = this.document.getElementById(id) as HTMLScriptElement;
      
      if (script) {
        script.innerHTML = JSON.stringify(data);
      } else {
        script = this.document.createElement('script');
        script.type = 'application/ld+json';
        script.id = id;
        script.innerHTML = JSON.stringify(data);
        this.document.head.appendChild(script);
      }
    }
  }

  removeJsonLd(id: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const script = this.document.getElementById(id);
      if (script) {
        script.remove();
      }
    }
  }
}