import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';
import { ProductService } from '../shared/services/product.service';
import { Observable, of } from 'rxjs';
import { BoughtProduct, Product } from '../shared/models/product.model';
import { RouterTestingModule } from '@angular/router/testing';

class ProductServiceMock {
    products: Observable<Product[]>;
    boughtProducts: Observable<BoughtProduct[]>;

    constructor() {
        this.products = of([
            {
                id: '8GHWbSqWS3G13BzuJuAx',
                name: 'Mandelgenuss',
                claim: 'Erfrischende Gesichtsmaske mit geriebenen Mandeln für reine Haut',
                description: 'Die pflegende Gesichtsmaske mit ausgewählten veganen und fair gehandelten Inhaltsstoffen\n' +
                    'ist besonders auf die Ansprüche sensibler Haut von Gesicht und Hals abgestimmt. Der\n' +
                    'Amaranth und die fein geriebenen Mandeln aus biologischem Anbau tragen sanft\n' +
                    'abgestorbene Hautzellen ab. Das Camu Camu Frucht-Pulver wird aus der Camu Camu\n' +
                    'Pflanze gewonnen. Die rot-orangen Beeren haben den weltweit höchsten Vitamin C-Gehalt\n' +
                    'und verleihen der Haut ein Vitamin-Boost. Das Maca Pulver pflegt intensiv und die\n' +
                    'beigesetzte rote Tonerde wirkt antibakteriell. Durch das beifügen des Kokosnussöls entsteht\n' +
                    'eine cremige und natürlich duftende Textur.',
                price: 6,
                points: 2,
                ingredients: [
                    'Fein geriebene Mandeln',
                    'Camu Camu Pulver (Pflanze mit hohem Vitamin C-Gehalt)',
                    'Rote Tonerde',
                    'Maca Pulver (Wurzel)',
                    'Amaranth'
                ],
                capacity: 85,
                additionalIngredients: ['4 EL Wasser', '3 EL Kokosnussöl'],
                application: [
                    {
                        step: 1,
                        text: 'Die bereits vorbereitete Rezeptur in einem Gefäß mit 4 EL Wasser und' +
                            ' 3 EL Kokosöl vermischen bis eine cremige, feinkörnige Masse entsteht'
                    },
                    {
                        step: 2,
                        text: 'In mehreren aufeinander folgenden Schritten haselnussgroße Mengen ' +
                            'im gesamten Gesicht auftragen und einmassieren'
                    },
                    {
                        step: 3,
                        text: 'Nach einer Einwirkzeit von 15 Minuten können die Rückstände der Maske mit lauwarmem Wasser entfernt werden'
                    }
                ]
            }
        ]);

        this.boughtProducts = of([
            {
                batchNumber: 'ZYwjgdzGJdZkbGLOogVS',
                name: 'Mandelgenuss',
                points: 2,
                price: 6,
                productId: '8GHWbSqWS3G13BzuJuAx',
                serialNumber: '2TPdjd75DzKDZ0Y7TYmS',
                timestamp: new Date('2. Juli 2019 um 08: 34: 24 UTC+2')
            }
        ]);
    }
}

describe('HomePage', () => {
    let component: HomePage;
    let fixture: ComponentFixture<HomePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomePage],
            imports: [
                RouterTestingModule
            ],
            providers: [
                { provide: ProductService, useClass: ProductServiceMock }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
