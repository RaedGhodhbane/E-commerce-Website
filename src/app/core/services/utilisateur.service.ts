import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  userRef!: AngularFirestoreCollection<Utilisateur>;

  constructor(private db: AngularFirestore) {

    this.userRef = db.collection('/utilisateur');

  }



  // CreateUser(utilisateur: any) {

  //   return this.db.collection('/utilisateur').add(utilisateur)

  // }



  getUsers() {

    return this.userRef;

  }



  deleteUser(id: string) {

    return this.db.collection('/utilisateur').doc(id).delete();

  }



  acceptUser(id: string, utilisateur: any) {

    return this.db.collection('/utilisateur').doc(id).update(utilisateur);

  }


  bloqueUser(id: string, utilisateur: any) {

    return this.db.collection('/utilisateur').doc(id).update(utilisateur);

  }

  debloqueUser(id: string, utilisateur: any) {

    return this.db.collection('/utilisateur').doc(id).update(utilisateur);

  }



}
