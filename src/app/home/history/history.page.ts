import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { IonContent } from '@ionic/angular';

@Component({
    selector: 'app-history',
    templateUrl: './history.page.html',
    styleUrls: ['./history.page.scss'],
})
export class HistoryPage {

    @ViewChild(IonContent) content: IonContent;

    constructor(public productService: ProductService) { }

}
