import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HeroesComponent } from './pages/heroes/heroes.component';
import { MembershipPricingComponent } from './pages/membership-pricing/membership-pricing.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Početna | UG Podveležje'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'O nama | UG Podveležje'
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then(m => m.NewsModule),
    title: 'Novosti | UG Podveležje'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Kontakt | UG Podveležje'
  },
  {
    path: 'membership',
    component: MembershipPricingComponent,
    title: 'Članstvo | UG Podveležje'
  },
  {
    path: 'heroes',
    component: HeroesComponent,
    title: 'Heroji | UG Podveležje'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
