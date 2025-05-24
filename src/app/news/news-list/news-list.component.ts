import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NewsService } from '../../services/news.service';
import { News, NewsResponse } from '../../interfaces/news.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NewsCardComponent } from '../news-card/news-card.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NewsCardComponent, HttpClientModule]
})
export class NewsListComponent implements OnInit {
  featuredNews: News[] = [];
  news: News[] = [];
  currentPage = 1;
  totalPages = 1;
  searchControl = new FormControl('');
  loading = false;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadFeaturedNews();
    this.loadNews();
    this.setupSearch();
  }

  private setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(query => {
        if (query) {
          this.loading = true;
          this.newsService.searchNews(query).subscribe(results => {
            this.news = results;
            this.loading = false;
          });
        } else {
          this.loadNews();
        }
      });
  }

  private loadFeaturedNews(): void {
    this.newsService.getFeaturedNews().subscribe(news => {
      this.featuredNews = news;
    });
  }

  loadNews(): void {
    this.loading = true;
    this.newsService.getAllNews(this.currentPage).subscribe((response: NewsResponse) => {
      this.news = response.items;
      this.totalPages = Math.ceil(response.total / response.pageSize);
      this.loading = false;
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadNews();
  }
}
