import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CategorieService } from './../../../core/services/categorie.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajouter-category',
  templateUrl: './ajouter-category.component.html',
  styleUrls: ['./ajouter-category.component.scss']
})
export class AjouterCategoryComponent implements OnInit {

  CategoryForm!: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private router: Router,
    private categorieservice: CategorieService
  ) { }

  ngOnInit(): void {
    this.CategoryForm = this.fb.group({
      nom: ['', Validators.required]
    })
  }

  get f() { return this.CategoryForm.controls }

  ajouter() {
    this.submitted = true;
    if (this.CategoryForm.invalid) {
      return;
    }
    this.categorieservice.CreateCategory(this.CategoryForm.value)
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
