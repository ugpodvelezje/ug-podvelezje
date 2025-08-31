import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { News, NewsResponse, NewsMetadata } from '../interfaces/news.interface';
import { marked } from 'marked';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private readonly PAGE_SIZE = 6;
  private newsFiles = [
    'dani-zavicaja-2025.md',
    'knjizevno-vecer-2025.md',
    'sportski-vikend-2025.md',
    'hiking-velez-2025.md',
    'promocija-knjige-i-sinija-2025.md'
  ];

  constructor(private http: HttpClient) {}

  private parseMarkdownFile(content: string): { metadata: NewsMetadata; htmlContent: string } {
    const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontMatterRegex);
    
    if (!match) {
      throw new Error('Invalid markdown file format');
    }

    const [, frontMatter, markdownContent] = match;
    
    const metadata: any = {};
    frontMatter.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        const value = valueParts.join(':').trim();
        
        if (value.startsWith("'") && value.endsWith("'")) {
          metadata[key.trim()] = value.slice(1, -1);
        } else if (value.startsWith('[') && value.endsWith(']')) {
          // Handle YAML array format like ['tag1', 'tag2']
          const arrayContent = value.slice(1, -1);
          if (arrayContent.trim()) {
            metadata[key.trim()] = arrayContent.split(',').map(item => 
              item.trim().replace(/^['"]|['"]$/g, '')
            );
          } else {
            metadata[key.trim()] = [];
          }
        } else if (value === 'true' || value === 'false') {
          metadata[key.trim()] = value === 'true';
        } else {
          metadata[key.trim()] = value.replace(/^['"]|['"]$/g, '');
        }
      }
    });

    const htmlContent = marked(markdownContent) as string;

    return { metadata, htmlContent };
  }

  private convertToNews(metadata: NewsMetadata, htmlContent: string): News {
    return {
      id: metadata.id,
      title: metadata.title,
      content: htmlContent,
      excerpt: metadata.excerpt,
      publishDate: this.parseDate(metadata.publishDate),
      author: metadata.author,
      imageUrl: metadata.imageUrl,
      tags: metadata.tags,
      featured: metadata.featured
    };
  }

  private parseDate(dateStr: string): Date {
    // Handle format "DD. Mjesec YYYY." or ISO format "YYYY-MM-DD"
    if (dateStr.includes('-')) {
      // ISO format
      return new Date(dateStr);
    }
    
    // Parse "DD. Mjesec YYYY." format
    const monthMap: { [key: string]: number } = {
      'januar': 0, 'februar': 1, 'mart': 2, 'april': 3, 'maj': 4, 'juni': 5,
      'juli': 6, 'august': 7, 'septembar': 8, 'oktobar': 9, 'novembar': 10, 'decembar': 11
    };
    
    const parts = dateStr.replace('.', '').split(' ');
    if (parts.length === 3) {
      const day = parseInt(parts[0]);
      const month = monthMap[parts[1].toLowerCase()];
      const year = parseInt(parts[2]);
      
      if (!isNaN(day) && month !== undefined && !isNaN(year)) {
        return new Date(year, month, day);
      }
    }
    
    // Fallback to current date if parsing fails
    return new Date();
  }

  private loadMarkdownFile(filename: string): Observable<News> {
    return this.http.get(`/assets/news-posts/${filename}`, { responseType: 'text' }).pipe(
      map(content => {
        const { metadata, htmlContent } = this.parseMarkdownFile(content);
        return this.convertToNews(metadata, htmlContent);
      }),
      catchError(error => {
        console.error(`Error loading news file ${filename}:`, error);
        return of(null as any);
      })
    );
  }

  private loadAllNews(): Observable<News[]> {
    const requests = this.newsFiles.map(filename => this.loadMarkdownFile(filename));
    
    return forkJoin(requests).pipe(
      map(newsItems => newsItems.filter(item => item !== null).sort((a, b) => 
        b.publishDate.getTime() - a.publishDate.getTime()
      ))
    );
  }

  getAllNews(page: number = 1): Observable<NewsResponse> {
    return this.loadAllNews().pipe(
      map(allNews => {
        const start = (page - 1) * this.PAGE_SIZE;
        const end = start + this.PAGE_SIZE;
        const items = allNews.slice(start, end);

        return {
          items,
          total: allNews.length,
          page,
          pageSize: this.PAGE_SIZE
        };
      })
    );
  }

  getNewsById(id: string): Observable<News | undefined> {
    return this.loadAllNews().pipe(
      map(allNews => allNews.find(news => news.id === id))
    );
  }

  getFeaturedNews(): Observable<News[]> {
    return this.loadAllNews().pipe(
      map(allNews => allNews.filter(news => news.featured))
    );
  }

  getNewsByTag(tag: string): Observable<News[]> {
    return this.loadAllNews().pipe(
      map(allNews => allNews.filter(news => news.tags.includes(tag)))
    );
  }

  searchNews(query: string): Observable<News[]> {
    const searchTerm = query.toLowerCase();
    return this.loadAllNews().pipe(
      map(allNews => allNews.filter(news => 
        news.title.toLowerCase().includes(searchTerm) || 
        news.content.toLowerCase().includes(searchTerm)
      ))
    );
  }
} 