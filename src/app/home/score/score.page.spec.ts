import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorePage } from './score.page';
import { Observable, of } from 'rxjs';
import { Transaction } from '../../shared/models/transaction.model';
import { ProductService } from '../../shared/services/product.service';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

class ProductServiceMock {
    transactions: Observable<Transaction[]>;

    constructor() {
        this.transactions = of([
            {
                product: {
                    batchNumber: 'ZYwjgdzGJdZkbGLOogVS',
                    price: 6,
                    productId: '8GHWbSqWS3G13BzuJuAx',
                    serialNumber: '2TPdjd75DzKDZ0Y7TYmS',
                },
                id: 'T9JzLrNjz0eu5R2ZwRin',
                name: 'Mandelgenuss',
                points: 2,
                timestamp: Timestamp.fromDate(new Date('2. Juli 2019 um 08: 34: 24 UTC+2'))
            }
        ]);
    }
}

describe('ScorePage', () => {
    let component: ScorePage;
    let fixture: ComponentFixture<ScorePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ScorePage],
            providers: [
                { provide: ProductService, useClass: ProductServiceMock }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScorePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
