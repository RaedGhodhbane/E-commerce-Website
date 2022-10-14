import { NgbDropdownModule, NgbModalModule, NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { AjouterArticleComponent } from './ajouter-article/ajouter-article.component';
import { ListArticleComponent } from './list-article/list-article.component';
import { ModifierArticleComponent } from './modifier-article/modifier-article.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng5SliderModule } from 'ng5-slider';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { WidgetModule } from 'src/app/shared/widget/widget.module';


@NgModule({
  declarations: [
    AjouterArticleComponent,
    ListArticleComponent,
    ModifierArticleComponent,
    DetailArticleComponent
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbNavModule,
    NgbModalModule,
    Ng2SearchPipeModule,
    NgbDropdownModule,
    DropzoneModule,
    UIModule,
    WidgetModule,
    Ng5SliderModule,
    NgSelectModule,
  ]
})
export class ArticleModule { }
