import { ModifierArticleComponent } from './modifier-article/modifier-article.component';
import { AjouterArticleComponent } from './ajouter-article/ajouter-article.component';
import { ListArticleComponent } from './list-article/list-article.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailArticleComponent } from './detail-article/detail-article.component';

const routes: Routes = [
  {
    path: '',
    component: ListArticleComponent
  },
  {
    path: 'ajouter',
    component: AjouterArticleComponent
  },
  {
    path: 'modifier',
    component: ModifierArticleComponent
  },
  {
    path: 'detail/:id',
    component: DetailArticleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
