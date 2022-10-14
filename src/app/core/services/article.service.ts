import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  userRef!: AngularFirestoreCollection<Article>;
  

  constructor(private db: AngularFirestore) {

    this.userRef = db.collection('/article');

  }



  CreateArticle(article: any) {

    return this.db.collection('/article').add(article)

  }



  getArticles() {

    return this.userRef;

  }


  getArticle(id: string){
    return this.db.collection('article').doc(id).get();
  }



  deleteArticle(id: string) {

    return this.db.collection('/article').doc(id).delete();

  }

  modifyArticle(id: string, souscategory: any) {

    return this.db.collection('/article').doc(id).update(souscategory);

  }
}
