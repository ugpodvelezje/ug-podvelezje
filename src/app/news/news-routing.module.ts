import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';

const routes: Routes = [
  {
    path: '',
    component: NewsListComponent,
    title: 'UG Podvelezje - Novosti'
  },
  {
    path: ':id',
    component: NewsDetailComponent,
    title: 'UG Podvelezje - Detalji Novosti'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
