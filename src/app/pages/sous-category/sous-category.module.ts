import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SousCategoryRoutingModule } from './sous-category-routing.module';
import { AjouterSousCategoryComponent } from './ajouter-sous-category/ajouter-sous-category.component';
import { ListSousCategoryComponent } from './list-sous-category/list-sous-category.component';
import { ModifierSousCategoryComponent } from './modifier-sous-category/modifier-sous-category.component';


@NgModule({
  declarations: [
    AjouterSousCategoryComponent,
    ListSousCategoryComponent,
    ModifierSousCategoryComponent
  ],
  imports: [
    CommonModule,
    SousCategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SousCategoryModule { }
