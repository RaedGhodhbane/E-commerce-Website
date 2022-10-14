import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productList, productModel } from '../../ecommerce/product.model';
import { ArticleService } from '../../../core/services/article.service';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss']
})
export class DetailArticleComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  id_article: string;

  isImage;
  article! :any;

  constructor(private route: ActivatedRoute, private service: ArticleService) {
    this.route.params.subscribe(params =>
      {this.id_article = params.id}
      )
    console.log(this.id_article);    
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Product Detail', active: true }];
    this.getArticle();
  }


  getArticle(){
    this.service.getArticle(this.id_article).subscribe((doc)=>{
      console.log(doc.data());
      this.article = doc.data();
  });
    console.log(this.article);
  }

  /**
   * onclick Image show
   * @param event image passed
   */
  imageShow(event) {
    const image = event.target.src;
    this.isImage = image;
    const expandImg = document.getElementById('expandedImg') as HTMLImageElement;
    expandImg.src = image;
  }

}
