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
    title: 'Podveležje - Čuvari tradicije i prirode planine Velež'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'O nama - Udruženje građana Podveležje | Kulturna baština'
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then(m => m.NewsModule),
    title: 'Novosti iz Podveležja | UG Podveležje'
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Kontakt - Udruženje građana Podveležje'
  },
  {
    path: 'membership',
    component: MembershipPricingComponent,
    title: 'Članstvo u udruženju Podveležje | UG Podveležje'
  },
  {
    path: 'heroes',
    component: HeroesComponent,
    title: 'Heroji Podveležja | Kulturna baština'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
