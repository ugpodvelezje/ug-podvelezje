import { Injectable } from '@angular/core';
import { NewsService } from './news.service';
import { Observable, map } from 'rxjs';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SitemapService {
  private baseUrl = 'https://podvelezje.ba';

  constructor(private newsService: NewsService) {}

  generateSitemap(): Observable<string> {
    return this.newsService.getAllNews().pipe(
      map(allNews => {
        const staticUrls: SitemapUrl[] = [
          {
            loc: this.baseUrl,
            lastmod: new Date().toISOString().split('T')[0],
            changefreq: 'daily',
            priority: 1.0
          },
          {
            loc: `${this.baseUrl}/about`,
            lastmod: new Date().toISOString().split('T')[0],
            changefreq: 'monthly',
            priority: 0.8
          },
          {
            loc: `${this.baseUrl}/news`,
            lastmod: new Date().toISOString().split('T')[0],
            changefreq: 'daily',
            priority: 0.9
          },
          {
            loc: `${this.baseUrl}/contact`,
            lastmod: new Date().toISOString().split('T')[0],
            changefreq: 'monthly',
            priority: 0.7
          },
          {
            loc: `${this.baseUrl}/membership`,
            lastmod: new Date().toISOString().split('T')[0],
            changefreq: 'monthly',
            priority: 0.8
          },
          {
            loc: `${this.baseUrl}/heroes`,
            lastmod: new Date().toISOString().split('T')[0],
            changefreq: 'monthly',
            priority: 0.6
          }
        ];

        const newsUrls: SitemapUrl[] = allNews.map(news => ({
          loc: `${this.baseUrl}/news/${news.id}`,
          lastmod: news.publishDate.toISOString().split('T')[0],
          changefreq: 'weekly',
          priority: 0.6
        }));

        const allUrls = [...staticUrls, ...newsUrls];
        return this.generateSitemapXml(allUrls);
      })
    );
  }

  private generateSitemapXml(urls: SitemapUrl[]): string {
    const urlElements = urls.map(url => {
      let urlElement = `  <url>\n    <loc>${url.loc}</loc>\n`;
      
      if (url.lastmod) {
        urlElement += `    <lastmod>${url.lastmod}</lastmod>\n`;
      }
      
      if (url.changefreq) {
        urlElement += `    <changefreq>${url.changefreq}</changefreq>\n`;
      }
      
      if (url.priority !== undefined) {
        urlElement += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
      }
      
      urlElement += `  </url>`;
      return urlElement;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
  }

  generateRobotsTxt(): string {
    return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${this.baseUrl}/sitemap.xml

# Optimize crawling
Crawl-delay: 1

# Block common bot files (if any exist in the future)
Disallow: /admin/
Disallow: /private/
Disallow: /*.json$
Disallow: /*?preview=*
Disallow: /*?debug=*

# Allow important directories
Allow: /assets/
Allow: /news/
Allow: /about/
Allow: /contact/
Allow: /membership/

# Block development/testing files
Disallow: /test/
Disallow: /dev/
Disallow: /*.test.*
Disallow: /*.spec.*

# Host information
Host: podvelezje.ba`;
  }
}