import { Component, HostListener, signal, PLATFORM_ID, Inject, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { BrowserService } from '../../services/browser.service';
import { ViewportScroller } from '@angular/common';

interface NavItem {
  label: string;
  route: string;
  exact?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  // Track the mobile menu state
  private mobileMenuOpen = signal(false);
  
  // Track scroll state for changing navbar appearance
  isScrolled = signal<boolean>(false);
  
  // Track About section visibility
  isAboutVisible = signal<boolean>(false);
  
  // Track current active route
  currentRoute = signal<string>('');
  
  // Subscription for cleanup
  private routerSubscription: Subscription | null = null;
  private scrollHandler: any = null;
  
  // Define navigation items
  navItems: NavItem[] = [
    { label: 'Početna', route: '/', exact: true },
    { label: 'O nama', route: '/#about' },
    { label: 'Projekti', route: '/projects' },
    { label: 'Novosti', route: '/news' },
    { label: 'Kontakt', route: '/contact' }
  ];
  
  private viewportScroller = inject(ViewportScroller);
  
  constructor(
    private router: Router,
    private location: Location,
    private browserService: BrowserService
  ) {}
  
  // Public getter for mobile menu state
  isMobileMenuOpen(): boolean {
    return this.mobileMenuOpen();
  }
  
  ngOnInit(): void {
    // Listen to route changes to update active states
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute.set(event.urlAfterRedirects);
        // Check for section visibility after route change
        setTimeout(() => this.checkSectionVisibility(), 300);
      }
    });
    
    // Add scroll event listener with bound function reference for proper cleanup
    this.scrollHandler = this.checkSectionVisibility.bind(this);
    this.browserService.addEventListener('scroll', this.scrollHandler);
    
    // Initial check for section visibility
    setTimeout(() => this.checkSectionVisibility(), 300);
  }
  
  ngOnDestroy(): void {
    // Clean up all subscriptions
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    
    // Clean up scroll event listener
    if (this.scrollHandler) {
      this.browserService.removeEventListener('scroll', this.scrollHandler);
    }
  }
  
  // Check which section is currently visible
  private checkSectionVisibility(): void {
    const document = this.browserService.getDocument();
    if (!document) return;
    
    // Check if about section is in view
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const aboutVisible = this.isElementInMiddleOfViewport(aboutSection);
      this.isAboutVisible.set(aboutVisible);
    }
  }
  
  // Listen for scroll events
  onWindowScroll(): void {
    // Change navbar style when scrolled
    const scrollThreshold = 50;
    this.isScrolled.set(this.browserService.getPageYOffset() > scrollThreshold);
    
    // Update section visibility on scroll
    this.checkSectionVisibility();
  }
  
  // Scroll to element with id
  scrollToElement(elementId: string): void {
    this.closeMobileMenu();
    this.browserService.scrollToElement(elementId);
  }
  
  // Navigate to home page and scroll to about section
  navigateToAbout(): void {
    this.closeMobileMenu();
    this.viewportScroller.scrollToAnchor('about');
  }
  
  // Check if About section is active
  isAboutActive(): boolean {
    return this.browserService.getLocation()?.hash === '#about';
  }
  
  // Check if element is in the middle part of the viewport (more accurate for large sections)
  private isElementInMiddleOfViewport(element: HTMLElement): boolean {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    const windowHeight = this.browserService.getInnerHeight();
    
    // Element takes significant portion of the screen or its middle part is visible
    const elementHeight = rect.bottom - rect.top;
    const elementMiddle = rect.top + elementHeight / 2;
    
    return (
      // Either the element is large enough to fill most of the viewport
      (elementHeight > windowHeight * 0.7) ||
      // Or the middle of the element is in the middle portion of the viewport
      (elementMiddle > windowHeight * 0.3 && elementMiddle < windowHeight * 0.7)
    );
  }

  // Toggle mobile menu
  toggleMobileMenu(): void {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }

  // Close mobile menu
  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  isJoinUsActive(): boolean {
    return this.browserService.getLocation()?.hash === '#join-us';
  }

  navigateToJoinUs() {
    this.closeMobileMenu();
    this.viewportScroller.scrollToAnchor('join-us');
  }
}
