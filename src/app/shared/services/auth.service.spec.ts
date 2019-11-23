import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';


/*
 * See https://github.com/angular/angularfire2/issues/18#issuecomment-351670746
 * Get current user data is working, AngularFirestore needs to be spied on
 */

const credentialsMock = {
    email: 'bene@mail.de',
    password: 'abc123'
};

// noinspection JSUnusedLocalSymbols
const userMock = {
    uid: 'u7JJsru26IcokqNwVsoGEO96dWe2',
    email: credentialsMock.email
};

const fakeAuthState = new BehaviorSubject(null);

const angularFireAuthStub = {
    authState: fakeAuthState
};

describe('AuthService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environment.firebaseConfig),
                RouterTestingModule
            ],
            providers: [
                { provide: AngularFireAuth, useValue: angularFireAuthStub },
                AngularFirestore,
                AuthService
            ]
        });
    });


    it('should be created', () => {
        const service: AuthService = TestBed.get(AuthService);
        expect(service).toBeTruthy();
    });
});
