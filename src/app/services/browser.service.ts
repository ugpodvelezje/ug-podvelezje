import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getWindow(): Window | null {
    return this.isBrowser ? window : null;
  }

  getDocument(): Document | null {
    return this.isBrowser ? document : null;
  }

  getLocalStorage(): Storage | null {
    return this.isBrowser ? localStorage : null;
  }

  scrollToElement(elementId: string, options: ScrollIntoViewOptions = { behavior: 'smooth' }): void {
    if (!this.isBrowser) return;
    
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView(options);
      }
    }, 100);
  }

  scrollToTop(options: ScrollToOptions = { top: 0, behavior: 'smooth' }): void {
    if (!this.isBrowser) return;
    window.scrollTo(options);
  }

  addEventListener(type: string, listener: EventListenerOrEventListenerObject): void {
    if (!this.isBrowser) return;
    window.addEventListener(type, listener);
  }

  removeEventListener(type: string, listener: EventListenerOrEventListenerObject): void {
    if (!this.isBrowser) return;
    window.removeEventListener(type, listener);
  }

  getInnerWidth(): number {
    return this.isBrowser ? window.innerWidth : 0;
  }

  getInnerHeight(): number {
    return this.isBrowser ? window.innerHeight : 0;
  }

  getPageYOffset(): number {
    return this.isBrowser ? window.pageYOffset : 0;
  }

  getLocation(): Location | null {
    return this.isBrowser ? window.location : null;
  }

  setInterval(handler: TimerHandler, timeout?: number): number | undefined {
    if (!this.isBrowser) return undefined;
    return window.setInterval(handler, timeout);
  }

  clearInterval(id?: number): void {
    if (!this.isBrowser || !id) return;
    window.clearInterval(id);
  }

  getNavigator(): Navigator | null {
    return this.isBrowser ? window.navigator : null;
  }
} 