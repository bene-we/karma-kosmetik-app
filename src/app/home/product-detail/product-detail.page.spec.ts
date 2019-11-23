import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailPage } from './product-detail.page';
import { OrderStepsPipe } from '../../shared/pipes/order-steps.pipe';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { product1 } from '../../shared/product.examples';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../shared/services/product.service';

class ProductServiceMock {
    // noinspection JSUnusedLocalSymbols,JSMethodCanBeStatic
    getProductById(productId): Observable<Product> {
        return of(product1);
    }
}

// See https://remypenchenat.blogspot.com/2018/02/angular-testing-activatedroute.html
class ActivatedRouteStub {

    // Observable that contains a map of the parameters
    private subjectParamMap = new BehaviorSubject(convertToParamMap(this.testParamMap));
    paramMap = this.subjectParamMap.asObservable();

    // tslint:disable-next-line:variable-name
    private _testParamMap: ParamMap;
    get testParamMap() {
        return this._testParamMap;
    }
    set testParamMap(params: {}) {
        this._testParamMap = convertToParamMap(params);
        this.subjectParamMap.next(this._testParamMap);
    }

    // Observable that contains a map of the query parameters
    private subjectQueryParamMap = new BehaviorSubject(convertToParamMap(this.testParamMap));
    queryParamMap = this.subjectQueryParamMap.asObservable();

    // tslint:disable-next-line:variable-name
    private _testQueryParamMap: ParamMap;
    get testQueryParamMap() {
        return this._testQueryParamMap;
    }
    set testQueryParamMap(params: {}) {
        this._testQueryParamMap = convertToParamMap(params);
        this.subjectQueryParamMap.next(this._testQueryParamMap);
    }

    get snapshot() {
        return {
            paramMap: this.testParamMap,
            queryParamMap: this.testQueryParamMap
        };
    }

}

describe('ProductDetailPage', () => {
    let component: ProductDetailPage;
    let fixture: ComponentFixture<ProductDetailPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProductDetailPage, OrderStepsPipe],
            imports: [
                AngularFireModule.initializeApp(environment.firebaseConfig),
                RouterTestingModule
            ],
            providers: [
                AngularFirestore,
                AngularFireAuth,
                {
                    provide: ActivatedRoute,
                    useClass: ActivatedRouteStub
                },
                {
                    provide: ProductService,
                    useClass: ProductServiceMock
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductDetailPage);
        component = fixture.componentInstance;

        const activatedRoute = fixture.debugElement.injector.get(ActivatedRoute) as any;
        activatedRoute.testParamMap = {id: 'pjSVRk9Dy71TdXevREB9'};

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
