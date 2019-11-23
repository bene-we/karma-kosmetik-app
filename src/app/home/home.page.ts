import { Component } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { Router } from '@angular/router';
import { Product } from '../shared/models/product.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage {

    isSearchbarOpened: boolean;

    searchedProducts: Product[];

    constructor(public productService: ProductService, private router: Router) { }

    doSearch(term: string) {
        this.isSearchbarOpened = true;
        this.productService.products.subscribe(
            (res) => {
                res = res.filter(p => {
                    return p.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
                });
                this.searchedProducts = res;
            }
        );
    }

    navigateToProduct(id: string) {
        this.router.navigate(['/app/home/product-detail', { id }]);
        setTimeout(() => { this.isSearchbarOpened = false; }, 500);
    }

    test() {
        this.router.navigate(['/app/home/product-detail', { id: 'pjSVRk9Dy71TdXevREB9' }]);
    }

}
