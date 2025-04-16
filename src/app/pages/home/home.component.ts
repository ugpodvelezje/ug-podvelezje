import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private route: ActivatedRoute
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      // Handle fragment scrolling
      this.route.fragment.subscribe(fragment => {
        if (fragment) {
          setTimeout(() => {
            const element = document.getElementById(fragment);
            if (element) {
              // Use scrollIntoView with block: 'start' to position at the top of viewport
              // and behavior: 'auto' to skip animation for immediate scroll
              element.scrollIntoView({ block: 'start', behavior: 'auto' });
            }
          }, 0); // Immediate execution to avoid showing hero section
        }
      });
    }
  }
}
