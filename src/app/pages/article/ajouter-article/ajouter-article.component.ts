import { AngularFireStorage } from '@angular/fire/storage';
import { ArticleService } from './../../../core/services/article.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SousCategorieService } from 'src/app/core/services/sous-categorie.service';
import { SousCategorie } from 'src/app/core/models/sous-categorie';
import Swal from 'sweetalert2';
import { Categorie } from 'src/app/core/models/categorie';
import { CategorieService } from 'src/app/core/services/categorie.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-ajouter-article',
  templateUrl: './ajouter-article.component.html',
  styleUrls: ['./ajouter-article.component.scss']
})
export class AjouterArticleComponent implements OnInit {
  souscategories: SousCategorie[] = [];
  categories: Categorie[] = [];
  ArticleForm!: FormGroup;
  image: string;
  user: any;
  submitted = false;
  constructor(private fb: FormBuilder, private router: Router,
    private articleservice: ArticleService, private souscategorieservice: SousCategorieService, private categorieservice: CategorieService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.ArticleForm = this.fb.group({
      nom: ['', Validators.required],
      prix: ['', Validators.required],
      quantity: ['', Validators.required],
      description: ['', Validators.required],
      marque: ['', Validators.required],
      image: ['', Validators.required],
      id_category: ['', Validators.required],
      id_sous_category: ['', Validators.required],
      id_utilisateur: [this.user.uid]
    });
    // this.getSousCategory()
    this.getCategory()
  }

  get f() { return this.ArticleForm.controls }


  getCategory() {
    this.categorieservice.getCategories().snapshotChanges().subscribe(data => {

      this.categories = data.map(categorie => {

        return {

          id: categorie.payload.doc.id,

          ...categorie.payload.doc.data() as Categorie
        }
      })
      console.log(this.categories)
    })

  }

  getSousCategory(id_category: string) {
    this.souscategorieservice.getSousCategories().snapshotChanges().subscribe(data => {

      this.souscategories = data.map(souscategorie => {

        return {

          id: souscategorie.payload.doc.id,

          ...souscategorie.payload.doc.data() as SousCategorie
        }

      })
      this.souscategories = this.souscategories.filter(data => data.id_categorie == id_category)
      console.log(this.souscategories)

    })

  }
  ajouter() {
    this.submitted = true;
    if (this.ArticleForm.invalid) {
      return;
    }
    this.ArticleForm.controls.image.setValue(this.image)
    this.articleservice.CreateArticle(this.ArticleForm.value)
    this.router.navigate(['articles'])
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
        })
      })
    ).subscribe()
  }

}
