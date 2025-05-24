import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { News, NewsResponse } from '../interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private readonly PAGE_SIZE = 6;
  private mockData: News[] = [];

  constructor(private http: HttpClient) {
    this.loadMockData();
  }

  private loadMockData(): void {
    this.mockData = [
      {
        id: '1',
        title: 'Uspješna Akcija Pošumljavanja na Podveležju',
        content: 'Proteklog vikenda, više od 150 mještana Podveležja učestvovalo je u velikoj akciji pošumljavanja našeg kraja. Zasađeno je preko 1000 sadnica borova i hrastova na području koje je bilo pogođeno požarom prošle godine. Posebno nas raduje veliki odziv mladih koji su pokazali izvanrednu predanost očuvanju naše prirodne baštine. Akciju su podržali i predstavnici lokalne zajednice, a planiramo nastaviti sa sličnim aktivnostima i u budućnosti.',
        excerpt: 'Zajednica zasadila preko 1000 stabala u akciji obnove šume',
        publishDate: new Date('2024-03-15'),
        author: 'Amir Hodžić',
        imageUrl: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17??ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        tags: ['okoliš', 'zajednica', 'volontiranje'],
        featured: true
      },
      {
        id: '2',
        title: 'Otvorenje Novog Društvenog Doma u Podveležju',
        content: 'Sa ponosom objavljujemo da je nakon godinu dana radova završena izgradnja novog društvenog doma u centru Podveležja. Objekat površine 300 kvadratnih metara sadrži veliku salu za sastanke i kulturne manifestacije, biblioteku, i prostorije za rad udruženja mladih. Svečano otvorenje će se održati sljedeće subote uz bogat kulturno-umjetnički program i tradicionalno druženje mještana.',
        excerpt: 'Novi društveni dom otvara vrata mještanima',
        publishDate: new Date('2024-03-10'),
        author: 'Emina Selimović',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        tags: ['infrastruktura', 'kultura', 'razvoj'],
        featured: true
      },
      {
        id: '3',
        title: 'Tradicionalni Festival Folklora "Podveležje 2024"',
        content: 'Ovogodišnji Festival folklora "Podveležje 2024" okupio je preko 20 kulturno-umjetničkih društava iz cijele Bosne i Hercegovine. Dvodnevna manifestacija je uključivala nastupe folklornih ansambala, izložbu tradicionalnih rukotvorina, i prezentaciju starih zanata. Festival je posjetilo više od 2000 ljudi, što ga čini najuspješnijim do sada.',
        excerpt: 'Rekordna posjećenost tradicionalnog festivala folklora',
        publishDate: new Date('2024-03-05'),
        author: 'Fatima Mehić',
        imageUrl: 'https://images.unsplash.com/photo-1692870613890-380d202518f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        tags: ['kultura', 'tradicija', 'manifestacije'],
        featured: false
      },
      {
        id: '4',
        title: 'Počinje Izgradnja Sportskog Terena',
        content: 'Započeli su radovi na izgradnji multifunkcionalnog sportskog terena pored osnovne škole u Podveležju. Projekat vrijedan 100.000 KM uključuje teren za mali nogomet i košarku, tribine za gledaoce, i modernu rasvjetu. Završetak radova se očekuje za dva mjeseca, a teren će biti dostupan svim mještanima za rekreaciju.',
        excerpt: 'Nova sportska infrastruktura za mještane',
        publishDate: new Date('2024-03-01'),
        author: 'Kenan Mahmutović',
        imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        tags: ['sport', 'infrastruktura', 'mladi'],
        featured: false
      },
      {
        id: '5',
        title: 'Uspješna Akcija Čišćenja Izvorišta',
        content: 'U organizaciji našeg udruženja, proteklog vikenda je održana velika akcija čišćenja lokalnih izvorišta vode. Više od 50 volontera je učestvovalo u čišćenju pet ključnih izvorišta na području Podveležja. Pored čišćenja, postavljene su i informativne table o važnosti očuvanja vodnih resursa.',
        excerpt: 'Volonteri očistili lokalna izvorišta vode',
        publishDate: new Date('2024-02-28'),
        author: 'Amra Kovačević',
        imageUrl: 'https://images.unsplash.com/photo-1538300342682-cf57afb97285?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        tags: ['okoliš', 'voda', 'volontiranje'],
        featured: false
      },
      {
        id: '6',
        title: 'Radionica Tradicionalnih Zanata za Mlade',
        content: 'Proteklog mjeseca održan je ciklus radionica tradicionalnih zanata za mlade iz našeg kraja. Kroz pet radionica, učesnici su imali priliku učiti o tradicionalnom pletenju, kovačkom zanatu, izradi predmeta od drveta i drugim vještinama od iskusnih majstora iz našeg kraja.',
        excerpt: 'Mladi uče tradicionalne zanate',
        publishDate: new Date('2024-02-25'),
        author: 'Jasmin Begić',
        imageUrl: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        tags: ['tradicija', 'edukacija', 'mladi'],
        featured: false
      }
    ];
  }

  getAllNews(page: number = 1): Observable<NewsResponse> {
    const start = (page - 1) * this.PAGE_SIZE;
    const end = start + this.PAGE_SIZE;
    const items = this.mockData.slice(start, end);

    return of({
      items,
      total: this.mockData.length,
      page,
      pageSize: this.PAGE_SIZE
    });
  }

  getNewsById(id: string): Observable<News | undefined> {
    return of(this.mockData.find(news => news.id === id));
  }

  getFeaturedNews(): Observable<News[]> {
    return of(this.mockData.filter(news => news.featured));
  }

  getNewsByTag(tag: string): Observable<News[]> {
    return of(this.mockData.filter(news => news.tags.includes(tag)));
  }

  searchNews(query: string): Observable<News[]> {
    const searchTerm = query.toLowerCase();
    return of(this.mockData.filter(news => 
      news.title.toLowerCase().includes(searchTerm) || 
      news.content.toLowerCase().includes(searchTerm)
    ));
  }
} 