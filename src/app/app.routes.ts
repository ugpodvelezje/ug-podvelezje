import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NewsComponent } from './pages/news/news.component';
import { ContactComponent } from './pages/contact/contact.component';

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
    component: NewsComponent,
    title: 'UG Podvelezje - Novosti'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'UG Podvelezje - Kontakt'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
