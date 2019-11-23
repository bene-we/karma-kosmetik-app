import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastService } from './toast.service';
import { ProductService } from './product.service';

@Injectable({
    providedIn: 'root'
})
export class ScanService {

    constructor(
        private barcodeScanner: BarcodeScanner,
        private toastService: ToastService,
        private productService: ProductService) { }

    startScanning() {
        this.barcodeScanner.scan().then(barcodeData => {
            console.log('Barcode data', barcodeData);
            if (barcodeData.cancelled) {
                this.toastService.showToast('Scan wurde abgebrochen', 5000);
            } else {
                const ids2 = barcodeData.text.split('/');
                const ids = ids2[ids2.length - 1].split('-');
                if (ids.length !== 3) {
                    this.toastService.showToast('Ist das ein KarmaKosmetik Barcode?', 5000);
                } else {
                    this.productService.setSerialAsScanned(ids[0], ids[1], ids[2])
                        .then(() => this.toastService.showToast('Code erfolgreich gescannt!', 5000))
                        .catch((err) => {
                            this.toastService.showToast('Ein Fehler ist aufgetreten', 5000);
                            console.error('ScanService#startScanning#setSerialAsScanned:', err);
                        });
                }
            }

        }).catch(err => {
            this.toastService.showToast('Barcode Scanner nicht verfügbar', 5000);
            console.error('ScanService#startScanning:', err);
        });
    }
}
