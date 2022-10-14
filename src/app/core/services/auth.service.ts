import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

    constructor(
        public afAuth: AngularFireAuth,
        private router : Router,
        private db: AngularFirestore
        // public http: HttpClient
    ) { 
        afAuth.authState.subscribe(user =>{
            if(user){
                localStorage.setItem('user', JSON.stringify(user))
            }
            else {
                localStorage.setItem('user', null)
            }
        })
    }



    login(user: any) {
        return this.afAuth.signInWithEmailAndPassword(user.email, user.password).then((result) =>{
            this.setUser(result.user.uid)
        })
    }

    setUser(uid){
        console.log(uid);
        return this.db.collection('users').doc(uid).get().subscribe((doc)=>{
            console.log(doc.data());
            localStorage.setItem('userInfo',JSON.stringify(doc.data()))
        });
        
    }


    logout(){
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('userInfo');
            localStorage.clear();
            this.router.navigate(['/account/login'])
        })
    }


    resetPassword(email){
        console.log(email)
        return this.afAuth.sendPasswordResetEmail(email);
    }


    changePassword(token : string, newpassword: string){
        return this.afAuth.confirmPasswordReset(token,newpassword)
    }

    register(user){
        return this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then((result) =>{
            this.createUser(user,result.user.uid)
        })
    }

    createUser(user,uid){
        this.db.collection('users').doc(uid).set(user);
    }


}

