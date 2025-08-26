import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';

const routes: Routes = [
  {
    path: '',
    component: NewsListComponent,
    title: 'Novosti | UG Podveležje'
  },
  {
    path: ':id',
    component: NewsDetailComponent,
    title: 'UG Podveležje - Detalji Novosti'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
