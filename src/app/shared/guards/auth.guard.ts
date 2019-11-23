import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap, map, take } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private auth: AuthService,
        private router: Router,
        private storage: Storage
    ) { }

    // See https://angularfirebase.com/lessons/google-user-auth-with-firestore-custom-data/

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        return this.auth.user.pipe(
            take(1),
            map(user => !!user),
            tap(loggedIn => {
                this.storage.get('intro-done').then(done => {
                    if (!done) {
                        this.storage.set('intro-done', true);
                        this.router.navigate(['/intro']);
                    } else {
                        if (!loggedIn) {
                            this.router.navigate(['/app/login']);
                        }
                    }
                });
            })
        );
    }

    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(next, state);
    }
}
