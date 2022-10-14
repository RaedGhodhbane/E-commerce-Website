import { Categorie } from './../../../core/models/categorie';
import { CategorieService } from './../../../core/services/categorie.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {
  categories: Categorie[] = [];

  constructor(private router: Router, private categorieservice: CategorieService) { }

  ngOnInit(): void {
    this.getCategory()
  }

  ajouter() {
    this.router.navigate(['categories/ajouter'])
  }

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

  modifier(category) {
    localStorage.setItem('category', JSON.stringify(category))
    this.router.navigate(['categories/modifier'])
    console.log(category)
    console.log(JSON.stringify(category))

  }

  supprimer(id) {
    this.categorieservice.deleteCategory(id)
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
        Swal.fire('Deleted!', 'Catégorie supprimée', 'success');
        this.supprimer(id)
      }
    });
  }
}
