import { Component } from '@angular/core';
import { ScanService } from '../shared/services/scan.service';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.page.html',
    styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {

    constructor(public scanService: ScanService) { }

}
