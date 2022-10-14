import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Boutique } from '../../core/models/boutique';
import { BoutiqueService } from '../../core/services/boutique.service';

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.scss']
})
export class BoutiqueComponent implements OnInit {

  BoutiqueForm: FormGroup;
  user: any;
  boutiques: Boutique[];
  boutique: any;
  exist: number;
  submitted = false;
  constructor(private fb: FormBuilder, private service: BoutiqueService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);

    this.BoutiqueForm = this.fb.group({
      nom: ['', Validators.required],
      adress: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.required],
      logo: ['', Validators.required],
      id_utilisateur: [this.user.uid],
    })
    this.getBoutique();
  }

  get f() { return this.BoutiqueForm.controls }

  CreateBoutique() {
    this.submitted = true;
    if (this.BoutiqueForm.invalid) {
      return;
    }
    // console.log(this.BoutiqueForm.value);
    this.service.createBoutique(this.BoutiqueForm.value)
  }

  getBoutique() {
    this.service.getBoutique().subscribe(data => {
      this.boutiques = data.map(boutique => {
        return {

          id: boutique.payload.doc.id,

          ...boutique.payload.doc.data() as Boutique
        }
      })
      // console.log(this.boutiques)
      this.boutique = this.boutiques.filter(data => {
        return data.id_utilisateur == this.user.uid;
      })
      this.exist = this.boutique.length;
      console.log(this.exist)

    })

  }


}
