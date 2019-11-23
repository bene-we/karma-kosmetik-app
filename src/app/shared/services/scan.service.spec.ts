import { TestBed } from '@angular/core/testing';

import { ScanService } from './scan.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';

/*
 * See https://github.com/chrisgriffith/ionic-native-mocks/blob/master/src/%40ionic-native-mocks/plugins/barcode-scanner/index.ts
 * For Ionic Native Mocks
 */

class BarcodeScannerMock {}

describe('ScanService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            AngularFireModule.initializeApp(environment.firebaseConfig),
            RouterTestingModule
        ],
        providers: [
            { provide: BarcodeScanner, useClass: BarcodeScannerMock },
            AngularFirestore,
            AngularFireAuth
        ]
    }));

    it('should be created', () => {
        const service: ScanService = TestBed.get(ScanService);
        expect(service).toBeTruthy();
    });
});
