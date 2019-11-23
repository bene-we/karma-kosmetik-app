import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsPage } from './tabs.page';
import { ScanService } from '../shared/services/scan.service';

class MockScanService { }

describe('TabsPage', () => {
    let component: TabsPage;
    let fixture: ComponentFixture<TabsPage>;

    let scanService: MockScanService;

    beforeEach(async(() => {

        scanService = new MockScanService();

        TestBed.configureTestingModule({
            declarations: [TabsPage],
            providers: [
                { provide: ScanService, useValue: MockScanService }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TabsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
