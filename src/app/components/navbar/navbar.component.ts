import { Component, signal, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { BrowserService } from '../../services/browser.service';

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
  
  // Track if we're on home page for transparent navbar behavior
  isHomePage = signal<boolean>(false);
  
  // Track which section is currently active based on scroll position
  activeSection = signal<string>('home');
  
  // Track current active route
  currentRoute = signal<string>('');
  
  // Store scroll position when menu opens
  private scrollPosition = 0;
  
  // Define sections with their scroll thresholds
  private sections = [
    { id: 'home', element: null as HTMLElement | null },
    { id: 'join-us', element: null as HTMLElement | null }
  ];
  
  // Subscription for cleanup
  private routerSubscription: Subscription | null = null;
  private scrollHandler: any = null;
  
  // Define navigation items
  navItems: NavItem[] = [
    { label: 'Početna', route: '/', exact: true },
    { label: 'O nama', route: '/about' },
    { label: 'Novosti', route: '/news' },
    { label: 'Kontakt', route: '/contact' }
  ];
  
  
  constructor(
    private router: Router,
    private browserService: BrowserService
  ) {}
  
  // Public getter for mobile menu state
  isMobileMenuOpen(): boolean {
    return this.mobileMenuOpen();
  }
  
  // Public getter for transparent state
  shouldBeTransparent(): boolean {
    return this.isHomePage() && !this.isScrolled() && !this.isMobileMenuOpen();
  }
  
  ngOnInit(): void {
    // Listen to route changes to update active states
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute.set(event.urlAfterRedirects);
        // Update home page state
        const isHome = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '';
        this.isHomePage.set(isHome);
        // Close mobile menu on route change
        this.closeMobileMenu();
        // Reset to home section when navigating to home page
        if (event.urlAfterRedirects === '/' || event.urlAfterRedirects === '') {
          // Check for hash fragments
          const hash = this.browserService.getLocation()?.hash;
          if (hash === '#join-us') {
            this.activeSection.set('join-us');
          } else {
            this.activeSection.set('home');
          }
        }
        // Initialize sections and check visibility after route change
        setTimeout(() => {
          this.initializeSections();
          this.checkSectionVisibility();
        }, 300);
      }
    });
    
    // Add scroll event listener with bound function reference for proper cleanup
    this.scrollHandler = this.checkSectionVisibility.bind(this);
    this.browserService.addEventListener('scroll', this.scrollHandler);
    
    // Initial setup
    setTimeout(() => {
      this.initializeSections();
      this.checkSectionVisibility();
      // Set initial home page state
      const isHome = this.router.url === '/' || this.router.url === '';
      this.isHomePage.set(isHome);
    }, 300);
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

    // Ensure body scroll is restored on component destroy
    this.toggleBodyScroll(false);
  }
  
  // Initialize section elements
  private initializeSections(): void {
    const document = this.browserService.getDocument();
    if (!document) return;
    
    this.sections.forEach(section => {
      section.element = document.getElementById(section.id);
    });
  }
  
  // Check which section is currently visible and update active section
  private checkSectionVisibility(): void {
    const document = this.browserService.getDocument();
    if (!document) return;
    
    const scrollY = this.browserService.getPageYOffset();
    const windowHeight = this.browserService.getInnerHeight();
    
    // Update scroll state for navbar background transition (works on all pages)
    const scrollThreshold = 20;
    this.isScrolled.set(scrollY > scrollThreshold);
    
    // Only do section visibility detection on home page
    if (this.currentRoute() !== '/') return;
    
    // Find the section that's most visible in the viewport
    let newActiveSection = 'home';
    let maxVisibility = 0;
    
    this.sections.forEach(section => {
      if (!section.element) return;
      
      const rect = section.element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      
      // Calculate how much of the element is visible
      let visibleHeight = 0;
      
      if (elementTop <= 0 && elementBottom >= 0) {
        // Element starts above viewport but extends into it
        visibleHeight = Math.min(elementBottom, windowHeight);
      } else if (elementTop >= 0 && elementTop < windowHeight) {
        // Element starts within viewport
        visibleHeight = Math.min(elementBottom - elementTop, windowHeight - elementTop);
      }
      
      // Calculate visibility percentage
      const elementHeight = rect.height;
      const visibilityRatio = elementHeight > 0 ? visibleHeight / elementHeight : 0;
      
      // Special handling for sections
      if (section.id === 'home') {
        // Home is active when at the very top or when hero section is significantly visible
        if (scrollY < 100 || (elementTop >= -100 && visibilityRatio > 0.3)) {
          if (scrollY < 100 || visibilityRatio > maxVisibility) {
            maxVisibility = visibilityRatio;
            newActiveSection = 'home';
          }
        }
      } else {
        // Other sections need to be significantly visible
        if (visibilityRatio > 0.4 && visibilityRatio > maxVisibility) {
          maxVisibility = visibilityRatio;
          newActiveSection = section.id;
        }
      }
    });
    
    // Update active section if it changed
    if (newActiveSection !== this.activeSection()) {
      this.activeSection.set(newActiveSection);
    }
  }
  
  // Listen for scroll events
  onWindowScroll(): void {
    // Change navbar style when scrolled - lower threshold for smoother transition
    const scrollThreshold = 20;
    this.isScrolled.set(this.browserService.getPageYOffset() > scrollThreshold);
    
    // Update section visibility on scroll
    this.checkSectionVisibility();
  }
  
  // Scroll to element with id
  scrollToElement(elementId: string): void {
    this.closeMobileMenu();
    this.browserService.scrollToElement(elementId);
  }
  
  // Check if Home section is active
  isHomeActive(): boolean {
    // Home is active when on home route and no specific section is active, or when home section is active
    return this.currentRoute() === '/' && this.activeSection() === 'home';
  }
  

  // Toggle mobile menu
  toggleMobileMenu(): void {
    const isOpen = !this.mobileMenuOpen();
    this.mobileMenuOpen.set(isOpen);
    this.toggleBodyScroll(isOpen);
  }

  // Close mobile menu
  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    this.toggleBodyScroll(false);
  }

  // Toggle body scroll for mobile menu
  private toggleBodyScroll(disable: boolean): void {
    const document = this.browserService.getDocument();
    const window = this.browserService.getWindow();
    if (!document || !window) return;

    if (disable) {
      // Store current scroll position
      this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      // Add class to prevent scrolling
      document.body.classList.add('mobile-menu-open');
      // Set body position to prevent scroll jump
      document.body.style.top = `-${this.scrollPosition}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      // Remove class and styles
      document.body.classList.remove('mobile-menu-open');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      // Restore scroll position instantly without animation
      window.scrollTo({
        top: this.scrollPosition,
        left: 0,
        behavior: 'instant'
      });
    }
  }

  isJoinUsActive(): boolean {
    return this.currentRoute() === '/' && this.activeSection() === 'join-us';
  }

  navigateToJoinUs() {
    this.closeMobileMenu();
    
    // Check if we're already on the home page
    if (this.currentRoute() === '/') {
      // Already on home page, just scroll to the section
      this.scrollToJoinUsSection();
    } else {
      // Navigate to home page first, then scroll after navigation completes
      this.router.navigate(['/']).then(() => {
        // Wait for the page to load and then scroll
        setTimeout(() => {
          this.scrollToJoinUsSection();
        }, 300);
      });
    }
  }

  private scrollToJoinUsSection() {
    setTimeout(() => {
      const joinUsElement = document.getElementById('join-us');
      if (joinUsElement) {
        const navbarHeight = 70;
        const elementTop = joinUsElement.offsetTop;
        const scrollTop = elementTop - navbarHeight;
        
        window.scrollTo({
          top: Math.max(0, scrollTop),
          behavior: 'smooth'
        });
      }
    }, 100);
  }
}
