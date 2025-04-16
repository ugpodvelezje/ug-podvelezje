import { Component, HostListener, signal, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  // Track the mobile menu state
  isMobileMenuOpen = signal<boolean>(false);
  
  // Track scroll state for changing navbar appearance
  isScrolled = signal<boolean>(false);
  
  // Flag to check if we're in browser environment
  private isBrowser: boolean;
  
  // Define navigation items
  navItems: NavItem[] = [
    { label: 'Početna', route: '/' },
    { label: 'O nama', route: '/about' },
    { label: 'Novosti', route: '/news' },
    { label: 'Kontakt', route: '/contact' }
  ];
  
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  
  // Listen for scroll events
  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!this.isBrowser) return;
    
    // Change navbar style when scrolled past a threshold (e.g., 50px)
    const scrollThreshold = 50;
    this.isScrolled.set(window.scrollY > scrollThreshold);
  }
  
  // Toggle mobile menu
  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(state => !state);
  }
  
  // Close mobile menu (e.g., after clicking a link)
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
    
    // Check if we're already on the home page
    if (window.location.pathname === '/') {
      // If we're already on the home page, just scroll to the element
      this.scrollToElement('about');
    }
    // Router will handle navigation to home page with fragment
  }
}
