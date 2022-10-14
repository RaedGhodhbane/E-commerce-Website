import { ModifierSousCategoryComponent } from './modifier-sous-category/modifier-sous-category.component';
import { ListSousCategoryComponent } from './list-sous-category/list-sous-category.component';
import { AjouterSousCategoryComponent } from './ajouter-sous-category/ajouter-sous-category.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListSousCategoryComponent
  },
  {
    path: 'ajouter',
    component: AjouterSousCategoryComponent
  },
  {
    path: 'modifier',
    component: ModifierSousCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SousCategoryRoutingModule { }
