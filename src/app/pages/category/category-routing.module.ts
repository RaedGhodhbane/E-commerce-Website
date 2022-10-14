import { ModifierCategoryComponent } from './modifier-category/modifier-category.component';
import { AjouterCategoryComponent } from './ajouter-category/ajouter-category.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListCategoryComponent
  },
  {
    path: 'ajouter',
    component: AjouterCategoryComponent
  },
  {
    path: 'modifier',
    component: ModifierCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
