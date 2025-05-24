import { Component, HostListener, signal, PLATFORM_ID, Inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

interface NavItem {
  label: string;
  route: string;
  exact?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  // Track the mobile menu state
  isMobileMenuOpen = signal<boolean>(false);
  
  // Track scroll state for changing navbar appearance
  isScrolled = signal<boolean>(false);
  
  // Track About section visibility
  isAboutVisible = signal<boolean>(false);
  
  // Track current active route
  currentRoute = signal<string>('');
  
  // Subscription for cleanup
  private routerSubscription: Subscription | null = null;
  private scrollHandler: any = null;
  
  // Flag to check if we're in browser environment
  private isBrowser: boolean;
  
  // Define navigation items
  navItems: NavItem[] = [
    { label: 'Početna', route: '/', exact: true },
    { label: 'O nama', route: '/#about' },
    { label: 'Projekti', route: '/projects' },
    { label: 'Novosti', route: '/news' },
    { label: 'Kontakt', route: '/contact' }
  ];
  
  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private router: Router,
    private location: Location
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  
  ngOnInit(): void {
    if (this.isBrowser) {
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
      window.addEventListener('scroll', this.scrollHandler);
      
      // Initial check for section visibility
      setTimeout(() => this.checkSectionVisibility(), 300);
    }
  }
  
  ngOnDestroy(): void {
    if (this.isBrowser) {
      // Clean up all subscriptions
      if (this.routerSubscription) {
        this.routerSubscription.unsubscribe();
      }
      
      // Clean up scroll event listener
      if (this.scrollHandler) {
        window.removeEventListener('scroll', this.scrollHandler);
      }
    }
  }
  
  // Check which section is currently visible
  private checkSectionVisibility(): void {
    if (!this.isBrowser) return;
    
    // Check if about section is in view
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const aboutVisible = this.isElementInMiddleOfViewport(aboutSection);
      this.isAboutVisible.set(aboutVisible);
    }
  }
  
  // Listen for scroll events
  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!this.isBrowser) return;
    
    // Change navbar style when scrolled
    const scrollThreshold = 50;
    this.isScrolled.set(window.scrollY > scrollThreshold);
    
    // Update section visibility on scroll
    this.checkSectionVisibility();
  }
  
  // Toggle mobile menu
  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(state => !state);
  }
  
  // Close mobile menu
  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
  
  // Scroll to element with id
  scrollToElement(elementId: string): void {
    if (!this.isBrowser) return;
    
    this.closeMobileMenu();
    
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
  
  // Navigate to home page and scroll to about section
  navigateToAbout(): void {
    if (!this.isBrowser) return;
    
    this.closeMobileMenu();
    
    // If we're already on the home page, just scroll to the about section
    if (this.location.path() === '' || this.location.path() === '/') {
      this.scrollToElement('about');
    } else {
      // Otherwise navigate to home with fragment
      this.router.navigate(['/'], { fragment: 'about' });
    }
  }
  
  // Check if About section is active
  isAboutActive(): boolean {
    if (!this.isBrowser) return false;
    
    const path = this.location.path();
    
    // Check if we're on the home page with about fragment OR if about section is visible
    if ((path === '' || path === '/') && this.isAboutVisible()) {
      return true;
    }
    
    // Check if URL explicitly has the about fragment
    return path === '/#about' || path === '/?#about';
  }
  
  // Check if element is in the middle part of the viewport (more accurate for large sections)
  private isElementInMiddleOfViewport(element: HTMLElement): boolean {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
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
}
