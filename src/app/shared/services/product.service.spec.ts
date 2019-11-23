import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';


describe('ProductService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            AngularFireModule.initializeApp(environment.firebaseConfig),
            RouterTestingModule
        ],
        providers: [
            AngularFirestore,
            AngularFireAuth
        ]
    }));

    /*it('should be created', () => {
        const service: ProductService = TestBed.get(ProductService);
        expect(service).toBeTruthy();
    });*/
});
