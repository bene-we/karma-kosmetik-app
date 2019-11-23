import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import { BoughtProduct, Product } from '../models/product.model';
import { Observable, ReplaySubject } from 'rxjs';
import { Batch, SerialNumber } from '../models/batch.model';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Transaction } from '../models/transaction.model';
import { Reward } from '../models/reward.model';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    /*
     * All products of the database
     */
    products = new ReplaySubject<Product[]>(2);

    /*
     * All transactions of the currently logged in user
     */
    transactions = new ReplaySubject<Transaction[]>(2);

    /*
     * The sum of points the currently logged in user has got
     */
    points = new ReplaySubject<number>(2);

    /*
     * The sum of points the user earned this month
     */
    newPointsThisMonth = new ReplaySubject<number>(2);

    /*
     * The sum of points a user spend on rewards
     */
    cashedPoints = new ReplaySubject<number>(2);

    /*
     * The available rewards a user can cash
     */
    rewards = new ReplaySubject<Reward[]>(2);


    constructor(
        private afStore: AngularFirestore,
        private authService: AuthService
    ) {
        // Emit products
        this.getProducts().subscribe((p) => this.products.next(p));

        // Emit transactions
        this.getTransactions().subscribe((t) => this.transactions.next(t));

        // Emit the sum of points
        this.getPoints().subscribe((p) => this.points.next(p));

        // Emit the sum of points from this month
        this.getNewPointsThisMonth().subscribe((p) => this.newPointsThisMonth.next(p));

        // Emit cashed points
        this.getCashedPoints().subscribe((p) => this.cashedPoints.next(p));

        // Emit available rewards
        this.getRewards().subscribe((r) => this.rewards.next(r));


        // this.backend_produce('pjSVRk9Dy71TdXevREB9', 4);


        // Example call of the function
        // All three numbers got to be included in the QR-code
        /*this.setSerialAsScanned('pjSVRk9Dy71TdXevREB9', 'WvOa3kaseiSgQaFioi6U', '0HTB4qZKMLxVX79xHmsQ')
            .then(() => {
                console.log('setSerialAsScanned', 'success');
            })
            .catch((err) => console.warn(err));*/
    }


    /*
     * Return all products from the database
     */
    private getProducts(): Observable<Product[]> {
        return this.afStore.collection<Product>('products').valueChanges();
    }

    /*
     * Return the product through its id
     */
    getProductById(id: string): Observable<Product> {
        if (id !== '') {
            return this.afStore
                .collection<Product>('products')
                .doc<Product>(id)
                .valueChanges();
        }
    }

    /*
     * Return the product through its name
     */
    getProductByName(name: string): Observable<Product> {
        return this.afStore
            .collection<Product>('products', ref => ref.where('name', '==', name))
            .valueChanges()
            .pipe(
                take(1),
                map(p => p[0])
            );
    }

    /*
     * Get all transactions of the logged in user
     * Transactions include bought (scanned) products and activated rewards
     */
    private getTransactions(): Observable<Transaction[]> {
        if (this.authService.userDoc) {
            return this.authService.userDoc
                .collection<Transaction>('transactions')
                .valueChanges();
        }
    }

    /*
     * Get the sum of the points a user has got from the database
     */
    private getPoints(): Observable<number> {
        return this.getTransactions().pipe(
            map((transactions) => transactions.map(t => t.points)),
            map((t) => t.reduce((sum, points) => sum + points))
        );
    }

    private getNewPointsThisMonth(): Observable<number> {
        const currentDate = new Date();
        return this.getTransactions().pipe(
            map((transactions) => transactions
                .filter(t => t.product)),
            map((transactions) => transactions
                .filter(t => t.timestamp >= Timestamp.fromDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)))),
            map((transactions) => transactions.map(t => t.points)),
            map((t) => t.reduce((sum, points) => sum + points))
        );
    }

    private getCashedPoints(): Observable<number> {
        return this.getTransactions().pipe(
            map((transactions) => transactions
                .filter(t => t.reward)),
            map((transactions) => transactions.map(t => t.points * (-1))),
            map((t) => t.reduce((sum, points) => sum + points, 0))
        );
    }

    /*
     * Get the available rewards
     */
    private getRewards(): Observable<Reward[]> {
        return this.afStore.collection<Reward>('rewards').valueChanges();
    }


    /*
     * Add information on a bought product to the according user in the database
     * DEPRECATED, see this.addTransaction()
     */
    /*addBoughtProduct(boughtProduct: BoughtProduct) {
        this.authService.user.subscribe((user) => {
            this.afStore
                .collection('users')
                .doc(user.uid)
                .collection('boughtProducts')
                .doc<BoughtProduct>(boughtProduct.serialNumber)
                .set(boughtProduct);
        });
    }*/

    /*
     * Replaces addBoughtProduct, adds transactions to the users collection
     */
    addTransaction(transaction: Transaction) {
        if (transaction.id === null) {
            transaction.id = this.afStore.createId();
        }

        if (transaction.timestamp === null) {
            transaction.timestamp = Timestamp.now();
        }

        this.authService.user.subscribe((user) => {
            this.afStore
                .collection('users')
                .doc(user.uid)
                .collection('transactions')
                .doc<Transaction>(transaction.id)
                .set(transaction);
        });
    }

    /*
     * Set a specific product through its serial number as scanned, if a user scanned a QR-code
     * Return an error if the code has already been scanned to prevent abuse
     */
    setSerialAsScanned(productId: string, batchNumber: string, serialNumber: string) {

        // Get corresponding document from database
        const serialRef = this.afStore.collection<Product>('products')
            .doc<Product>(productId)
            .collection('batches')
            .doc<Batch>(batchNumber)
            .collection('serialNumbers')
            .doc<SerialNumber>(serialNumber);

        return new Promise((resolve, reject) => {
            serialRef.get().subscribe(
                (doc: DocumentData) => {
                    const data: SerialNumber = doc.data() as SerialNumber;

                    // Check if the QR-code has been scanned already
                    if (data.scanned) {
                        reject('Code already scanned');
                    } else {
                        // 'scanned' is false, change it to true
                        serialRef.update({
                            serialNumber,
                            scanned: true
                        }).then(() => {

                            // Fetch the number of points one gets for a product
                            this.getProductById(productId)
                                .subscribe((p: Product) => {

                                    // Add the bought product to the users collection of the logged in user

                                    const boughtProduct: BoughtProduct = {
                                        productId,
                                        batchNumber,
                                        serialNumber,
                                        price: p.price,
                                    };

                                    const transaction: Transaction = {
                                        id: this.afStore.createId(),
                                        product: boughtProduct,
                                        points: p.points,
                                        name: p.name,
                                        timestamp: Timestamp.now()
                                    };

                                    this.addTransaction(transaction);

                                    resolve(doc);
                                });
                        }).catch((err) => reject(err));

                    }
                },
                (error) => reject(error)
            );
        });
    }


    generateChartData() {

    }

    /*generateChartData2(): Promise<ChartData[]> {
        return new Promise((resolve, reject) => {
            this.transactions.subscribe(
                (res) => {
                    res = res.filter(t => t.product);
                    this.chartData = [];
                    res.forEach((t) => {
                        const double = this.chartData.find(cd => cd.name === t.name);
                        if (double) {
                            double.points += t.points;
                        } else {
                            this.chartData.push({ name: t.name, points: t.points });
                        }
                        this.chartData.sort((a: ChartData, b: ChartData) => {
                            if (a.name < b.name) { return -1; }
                            if (a.name > b.name) { return 1; }
                            return 0;
                        });
                        console.log(this.chartData);
                        resolve(this.chartData);
                    });
                },
                (err) => reject(err)
            );
        });
    }*/


    /* BACKEND FUNCTIONS CALLED MANUALLY */

    /*
     * Create products in the database
     */
    /*backend_addProduct(product: Product) {
        this.afStore.collection<Product>('products').doc(product.id).set(product)
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
    }*/

    /*
     * 'Produce' articles, meaning adding batch numbers to the database
     */
    /*backend_produce(productId: string, quantity: number) {

        const batch: Batch = {
            batchNumber: this.afStore.createId(),
            quantity,
            timestamp: new Date()
        };

        this.afStore.collection<Product>('products')
            .doc(productId)
            .collection('batches')
            .doc(batch.batchNumber).set(batch);

        const snRef = this.afStore.collection<Product>('products')
            .doc(productId)
            .collection('batches')
            .doc(batch.batchNumber)
            .collection('serialNumbers');

        for (let i = 0; i <= quantity; i++) {
            const currentId = this.afStore.createId();
            const sn: SerialNumber = {
                scanned: false,
                serialNumber: currentId
            };
            snRef.doc(currentId).set(sn);
        }
    }*/

}
