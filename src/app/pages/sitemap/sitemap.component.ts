import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SitemapService } from '../../services/sitemap.service';
import { Response } from 'express';

@Component({
  selector: 'app-sitemap',
  template: '',
  standalone: true
})
export class SitemapComponent implements OnInit {

  constructor(private sitemapService: SitemapService) {}

  ngOnInit(): void {
    this.sitemapService.generateSitemap().subscribe(sitemapXml => {
      // Set content type and return XML
      if (typeof window !== 'undefined') {
        // Client-side - download or display
        const blob = new Blob([sitemapXml], { type: 'application/xml' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sitemap.xml';
        a.click();
        window.URL.revokeObjectURL(url);
      }
    });
  }
}