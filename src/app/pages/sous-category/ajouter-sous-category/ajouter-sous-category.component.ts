import { Categorie } from './../../../core/models/categorie';
import { CategorieService } from './../../../core/services/categorie.service';
import { SousCategorieService } from './../../../core/services/sous-categorie.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajouter-sous-category',
  templateUrl: './ajouter-sous-category.component.html',
  styleUrls: ['./ajouter-sous-category.component.scss']
})
export class AjouterSousCategoryComponent implements OnInit {
  categories: Categorie[] = [];
  Sous_CategoryForm!: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private router: Router,
    private souscategorieservice: SousCategorieService, private categorieservice: CategorieService) { }

  ngOnInit(): void {
    this.Sous_CategoryForm = this.fb.group({
      nom: ['', Validators.required],
      id_categorie: ['', Validators.required]
    });
    this.getCategory()
  }
  get f() { return this.Sous_CategoryForm.controls }

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
  ajouter() {
    this.submitted = true;
    if (this.Sous_CategoryForm.invalid) {
      return;
    }
    this.souscategorieservice.CreateSousCategory(this.Sous_CategoryForm.value)
    this.router.navigate(['sous-categories'])
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

}


