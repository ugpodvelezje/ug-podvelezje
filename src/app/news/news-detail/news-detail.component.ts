import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { News } from '../../interfaces/news.interface';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserService } from '../../services/browser.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class NewsDetailComponent implements OnInit {
  news: News | undefined;
  loading = true;
  error = false;
  showCustomShareMenu = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService,
    private browserService: BrowserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadNews(id);
    } else {
      this.router.navigate(['/news']);
    }
  }

  private loadNews(id: string): void {
    this.newsService.getNewsById(id).subscribe({
      next: (news) => {
        if (news) {
          this.news = news;
        } else {
          this.error = true;
        }
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('bs', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  goBack(): void {
    this.router.navigate(['/news']);
  }

  canShare(): boolean {
    const navigator = this.browserService.getNavigator();
    return !!(navigator && 'share' in navigator);
  }

  async shareArticle(): Promise<void> {
    if (!this.news) {
      return;
    }

    if (this.canShare()) {
      // Use native Web Share API
      const navigator = this.browserService.getNavigator();
      const window = this.browserService.getWindow();
      
      if (!navigator || !window) {
        return;
      }

      const shareData = {
        title: this.news.title,
        text: this.news.excerpt || this.news.content.substring(0, 100) + '...',
        url: window.location.href
      };

      try {
        await navigator.share(shareData);
      } catch (error) {
        // User cancelled sharing or sharing failed
        console.log('Sharing cancelled or failed:', error);
      }
    } else {
      // Show custom share menu for browsers without Web Share API
      this.showCustomShareMenu = !this.showCustomShareMenu;
    }
  }

  getCurrentUrl(): string {
    const window = this.browserService.getWindow();
    return window ? window.location.href : '';
  }

  async copyToClipboard(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const navigator = this.browserService.getNavigator();
    
    if (navigator && 'clipboard' in navigator) {
      try {
        await navigator.clipboard.writeText(input.value);
        // Modern clipboard API - you could add a toast notification here
      } catch (error) {
        // Fallback for older browsers
        this.fallbackCopyToClipboard(input);
      }
    } else {
      // Fallback for older browsers
      this.fallbackCopyToClipboard(input);
    }
  }

  private fallbackCopyToClipboard(input: HTMLInputElement): void {
    input.select();
    input.setSelectionRange(0, 99999);
    
    const document = this.browserService.getDocument();
    if (document) {
      try {
        document.execCommand('copy');
      } catch (error) {
        console.log('Copy to clipboard failed:', error);
      }
    }
  }

  shareViaFacebook(): void {
    const url = this.getCurrentUrl();
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    this.openShareWindow(facebookUrl);
  }

  shareViaTwitter(): void {
    const url = this.getCurrentUrl();
    const text = this.news?.title || '';
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    this.openShareWindow(twitterUrl);
  }

  shareViaWhatsApp(): void {
    const url = this.getCurrentUrl();
    const text = this.news?.title || '';
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
    this.openShareWindow(whatsappUrl);
  }

  shareViaEmail(): void {
    const url = this.getCurrentUrl();
    const subject = this.news?.title || '';
    const body = `Pogledaj ovu vijest: ${this.news?.title}\n\n${url}`;
    const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    const window = this.browserService.getWindow();
    if (window) {
      window.location.href = emailUrl;
    }
  }

  private openShareWindow(url: string): void {
    const window = this.browserService.getWindow();
    if (window) {
      window.open(url, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
    }
    this.showCustomShareMenu = false;
  }

  closeCustomShareMenu(): void {
    this.showCustomShareMenu = false;
  }

  async copyUrlToClipboard(): Promise<void> {
    const url = this.getCurrentUrl();
    const navigator = this.browserService.getNavigator();
    
    if (navigator && 'clipboard' in navigator) {
      try {
        await navigator.clipboard.writeText(url);
        // You could add a toast notification here
      } catch (error) {
        this.fallbackCopyUrl(url);
      }
    } else {
      this.fallbackCopyUrl(url);
    }
    this.showCustomShareMenu = false;
  }

  private fallbackCopyUrl(url: string): void {
    const document = this.browserService.getDocument();
    if (document) {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (error) {
        console.log('Copy to clipboard failed:', error);
      }
      document.body.removeChild(textArea);
    }
  }
}
