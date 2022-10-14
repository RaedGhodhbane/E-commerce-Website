import { SousCategorieService } from './../../../core/services/sous-categorie.service';
import { Router } from '@angular/router';
import { SousCategorie } from './../../../core/models/sous-categorie';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-sous-category',
  templateUrl: './list-sous-category.component.html',
  styleUrls: ['./list-sous-category.component.scss']
})
export class ListSousCategoryComponent implements OnInit {

  sous_categories: SousCategorie[] = [];
  constructor(private router: Router, private souscategorieservice: SousCategorieService) { }

  ngOnInit(): void {
    this.getSousCategories()
  }


  ajouter() {
    this.router.navigate(['sous-categories/ajouter'])
  }

  getSousCategories() {
    this.souscategorieservice.getSousCategories().snapshotChanges().subscribe(data => {

      this.sous_categories = data.map(sous_categorie => {

        return {

          id: sous_categorie.payload.doc.id,

          ...sous_categorie.payload.doc.data() as SousCategorie
        }

      })

      console.log(this.sous_categories)

    })

  }

  modifier(sous_category) {
    localStorage.setItem('sous-category', JSON.stringify(sous_category))
    this.router.navigate(['sous-categories/modifier'])
    console.log(sous_category)
    console.log(JSON.stringify(sous_category))

  }

  supprimer(id) {
    this.souscategorieservice.deleteSousCategory(id)
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
        Swal.fire('Deleted!', 'Sous-catégorie supprimée', 'success');
        this.supprimer(id)
      }
    });
  }

}
