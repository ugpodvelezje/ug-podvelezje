import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';

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
    path: 'projects',
    component: ProjectsComponent,
    title: 'UG Podvelezje - Projekti'
  },
  {
    path: 'projects/:id',
    component: ProjectDetailComponent,
    title: 'UG Podvelezje - Detalji Projekta'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
