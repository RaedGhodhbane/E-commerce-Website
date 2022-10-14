import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Commande } from '../models/commande';

@Injectable({
  providedIn: 'root'
})
export class CommandesService {

  userRef!: AngularFirestoreCollection<Commande>;

  constructor(private db: AngularFirestore) {

    this.userRef = db.collection('/commande');

  }

  getCommandes() {

    return this.userRef;

  }
}
