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
    title: 'UG Podvelezje - Početna'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'UG Podvelezje - O nama'
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then(m => m.NewsModule),
    title: 'UG Podvelezje - Novosti'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'UG Podvelezje - Kontakt'
  },
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path: 'membership',
    component: MembershipPricingComponent,
    title: 'UG Podvelezje - Članstvo'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
