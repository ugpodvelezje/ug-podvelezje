import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { ActivatedRoute } from '@angular/router';
import { JoinUsComponent } from '../../components/join-us/join-us.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, JoinUsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
