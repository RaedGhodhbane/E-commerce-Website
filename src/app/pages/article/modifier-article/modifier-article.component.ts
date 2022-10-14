import { AngularFireStorage } from '@angular/fire/storage';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SousCategorie } from 'src/app/core/models/sous-categorie';
import { ArticleService } from 'src/app/core/services/article.service';
import { SousCategorieService } from 'src/app/core/services/sous-categorie.service';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-modifier-article',
  templateUrl: './modifier-article.component.html',
  styleUrls: ['./modifier-article.component.scss']
})
export class ModifierArticleComponent implements OnInit {
  souscategories: SousCategorie[] = [];
  article!: any;
  ArticleForm!: FormGroup;
  image: string;
  user: any;
  submitted = false;
  constructor(private fb: FormBuilder, private router: Router,
    private articleservice: ArticleService, private souscategorieservice: SousCategorieService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(JSON.parse(localStorage.getItem('article')))
    this.article = JSON.parse(localStorage.getItem('article'))
    this.ArticleForm = this.fb.group({
      nom: [this.article.nom, Validators.required],
      prix: [this.article.prix, Validators.required],
      quantity: [this.article.quantity, Validators.required],
      description: [this.article.description, Validators.required],
      marque: [this.article.marque, Validators.required],
      image: ['', Validators.required],
      id_sous_category: [this.article.id_sous_category, Validators.required],
      id_utilisateur: [this.user.uid]
    });
    this.getSousCategory();
  }

  get f() { return this.ArticleForm.controls }

  getSousCategory() {
    this.souscategorieservice.getSousCategories().snapshotChanges().subscribe(data => {

      this.souscategories = data.map(souscategorie => {

        return {

          id: souscategorie.payload.doc.id,

          ...souscategorie.payload.doc.data() as SousCategorie
        }

      })

      console.log(this.souscategories)

    })

  }
  modifier() {
    this.submitted = true;
    if (this.ArticleForm.invalid) {
      return;
    }
    if (this.ArticleForm.value.image == '') {
      this.ArticleForm.controls.image.setValue(this.article.image)
    }

    this.articleservice.modifyArticle(this.article.id, this.ArticleForm.value)
    // this.router.navigate(['articles'])
    console.log(this.article.image)
    this.position()

  }

  position() {
    Swal.fire({
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    });
  }

  upload(event: any) {
    console.log(event.target.files);
    const name = event.target.files[0].name
    const path = `/images/${name}`
    const storageRef = this.storage.ref('/images/' + name)
    console.log(storageRef)
    const uploadTask = this.storage.upload(path, event.target.files[0])
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log(downloadURL)
          this.image = downloadURL
          this.ArticleForm.controls.image.setValue(this.image)

        })
      })
    ).subscribe()
  }
}
