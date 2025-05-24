import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { News, NewsResponse } from '../interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private readonly PAGE_SIZE = 6;
  private mockData: News[] = [];

  constructor(private http: HttpClient) {
    // Initialize with mock data
    this.loadMockData();
  }

  private loadMockData(): void {
    this.mockData = [
      {
        id: '1',
        title: 'Community Clean-up Initiative Success',
        content: 'Our recent community clean-up initiative was a huge success with over 100 participants...',
        excerpt: 'Community comes together for environmental action',
        publishDate: new Date('2024-03-15'),
        author: 'John Smith',
        imageUrl: '/assets/images/news/cleanup.jpg',
        tags: ['environment', 'community'],
        featured: true
      },
      // Add more mock data items here
    ];
  }

  getAllNews(page: number = 1): Observable<NewsResponse> {
    const start = (page - 1) * this.PAGE_SIZE;
    const end = start + this.PAGE_SIZE;
    const items = this.mockData.slice(start, end);

    return of({
      items,
      total: this.mockData.length,
      page,
      pageSize: this.PAGE_SIZE
    });
  }

  getNewsById(id: string): Observable<News | undefined> {
    return of(this.mockData.find(news => news.id === id));
  }

  getFeaturedNews(): Observable<News[]> {
    return of(this.mockData.filter(news => news.featured));
  }

  getNewsByTag(tag: string): Observable<News[]> {
    return of(this.mockData.filter(news => news.tags.includes(tag)));
  }

  searchNews(query: string): Observable<News[]> {
    const searchTerm = query.toLowerCase();
    return of(this.mockData.filter(news => 
      news.title.toLowerCase().includes(searchTerm) || 
      news.content.toLowerCase().includes(searchTerm)
    ));
  }
} 