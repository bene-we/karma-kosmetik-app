import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPage } from './history.page';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from '../../shared/services/product.service';
import { FirestoreDatePipe } from '../../shared/pipes/firestore-date.pipe';

class ProductServiceMock { }

describe('HistoryPage', () => {
    let component: HistoryPage;
    let fixture: ComponentFixture<HistoryPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HistoryPage, FirestoreDatePipe],
            imports: [
                AngularFireModule.initializeApp(environment.firebaseConfig),
                RouterTestingModule
            ],
            providers: [
                AngularFirestore,
                AngularFireAuth,
                { provide: ProductService, useClass: ProductServiceMock }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HistoryPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
