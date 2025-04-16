import { TestBed } from '@angular/core/testing';

import { HeroSlideshowService } from './hero-slideshow.service';

describe('HeroSlideshowService', () => {
  let service: HeroSlideshowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroSlideshowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
