import { Router } from '@angular/router';
import { Categorie } from './../../../core/models/categorie';
import { CategorieService } from './../../../core/services/categorie.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modifier-category',
  templateUrl: './modifier-category.component.html',
  styleUrls: ['./modifier-category.component.scss']
})
export class ModifierCategoryComponent implements OnInit {
  category !: any;
  CategoryForm!: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private router: Router,
    private categorieservice: CategorieService
  ) { }

  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('category')))
    this.category = JSON.parse(localStorage.getItem('category'))
    this.CategoryForm = this.fb.group({
      nom: [this.category.nom, Validators.required]
    })
  }

  get f() { return this.CategoryForm.controls }

  modifier() {
    this.submitted = true;
    if (this.CategoryForm.invalid) {
      return;
    }
    this.categorieservice.modifyCategory(this.category.id, this.CategoryForm.value)
    this.router.navigate(['categories'])
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
