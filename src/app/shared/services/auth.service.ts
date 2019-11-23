import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { User } from '../models/user.model';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user: Observable<User>;
    userDoc: AngularFirestoreDocument<User>;

    constructor(private afAuth: AngularFireAuth,
                private afStore: AngularFirestore,
                private router: Router) {
        this.user = this.afAuth.authState.pipe(
            // tap((res) => console.log(res)),
            switchMap(user => {
                if (user) {
                    this.userDoc = this.afStore.doc<User>(`users/${user.uid}`);
                    return this.userDoc.valueChanges();
                } else {
                    return of(null);
                }
            })
        );
    }

    login(credentials) {
        return new Promise((resolve, reject) =>
            this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
                .then(() => resolve())
                .catch((error) => reject(error))
        );
    }

    register(credentials) {
        return new Promise((resolve, reject) => {
            this.afAuth.auth
                .createUserWithEmailAndPassword(credentials.email, credentials.password)
                .then((res) => {
                    // Successfully registered, now store the user in FireStore for additionally information
                    /*this.afStore.collection('users').add({
                        uid: res.user.uid,
                        email: credentials.email,
                        name: credentials.name
                    })*/

                    const data: User = {
                        uid: res.user.uid,
                        email: credentials.email,
                        name: credentials.name
                    };

                    this.afStore.doc(`users/${data.uid}`).set(data, {merge: true})
                        .then(() => resolve())
                        .catch(() => reject());
                }).catch((error) => reject(error));
        });
    }

    logout() {
        // noinspection JSIgnoredPromiseFromCall
        this.afAuth.auth.signOut().then(() => this.router.navigate(['/']));
    }


}
