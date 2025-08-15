import { Component, Input } from '@angular/core';
import { News } from '../../interfaces/news.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class NewsCardComponent {
  @Input() news!: News;
  @Input() showFullContent = false;

  formatDate(date: Date): string {
    const d = new Date(date);
    const day = d.getDate();
    const year = d.getFullYear();
    
    const monthNames = [
      'januar', 'februar', 'mart', 'april', 'maj', 'juni',
      'juli', 'august', 'septembar', 'oktobar', 'novembar', 'decembar'
    ];
    
    const month = monthNames[d.getMonth()];
    
    return `${day}. ${month} ${year}.`;
  }
}
