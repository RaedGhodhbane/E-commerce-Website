import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/core/models/article';
import { ArticleService } from 'src/app/core/services/article.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent implements OnInit {

  articles: Article[] = [];

  constructor(private router: Router, private articlesservice: ArticleService) { }

  ngOnInit(): void {
    this.getArticle()
  }

  ajouter() {
    this.router.navigate(['articles/ajouter'])
  }

  getArticle() {
    this.articlesservice.getArticles().snapshotChanges().subscribe(data => {

      this.articles = data.map(article => {

        return {

          id: article.payload.doc.id,

          ...article.payload.doc.data() as Article
        }

      })

      console.log(this.articles)

    })

  }

  modifier(article) {
    localStorage.setItem('article', JSON.stringify(article))
    this.router.navigate(['articles/modifier'])
    console.log(article)
    console.log(JSON.stringify(article))

  }

  supprimer(id) {
    this.articlesservice.deleteArticle(id)
  }

  confirm(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        Swal.fire('Deleted!', 'Article supprimée', 'success');
        this.supprimer(id)
      }
    });
  }
}
