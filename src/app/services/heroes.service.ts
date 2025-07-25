import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Hero {
  name: string;
  birthDate: string;
  deathDate: string;
  image: string;
  month: number;
}

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private heroes: Hero[] = [
    // Sample data - replace with actual heroes data
    {
      name: 'Hero Name 1',
      birthDate: '1970-01-01',
      deathDate: '1995-01-15',
      image: 'assets/images/heroes/hero1.jpg',
      month: 1
    },
    // Add more heroes here
  ];

  constructor() { }

  getHeroes(): Observable<Hero[]> {
    return of(this.heroes);
  }

  getHeroesByMonth(month: number): Observable<Hero[]> {
    const filteredHeroes = this.heroes.filter(hero => {
      const deathDate = new Date(hero.deathDate);
      return deathDate.getMonth() === month;
    });
    return of(filteredHeroes);
  }
} 