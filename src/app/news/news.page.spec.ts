import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NewsPage } from './news.page';
import { NewsServiceMock } from '../../mocks/news-service.mock';
import { NewsService } from '../shared/services/news.service';
import { RouterTestingModule } from '@angular/router/testing';
import { exampleArticle } from '../../mocks/example-article';
import { Router } from '@angular/router';

describe('NewsPage', () => {
    let component: NewsPage;
    let fixture: ComponentFixture<NewsPage>;
    let searchbar: HTMLElement;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NewsPage],
            imports: [RouterTestingModule],
            providers: [
                { provide: NewsService, useClass: NewsServiceMock }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewsPage);
        component = fixture.componentInstance;
        searchbar = fixture.nativeElement.querySelector('ion-searchbar');
        router = TestBed.get(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /*
     * NT05
     */
    it('should shorten text', () => {
        // 140 characters plus 3 dots
        expect(component.shortenText(exampleArticle.text).length).toBe(140 + 3);
    });

    /*
     * NT06
     */
    it('should set isSearchbar to true when writing', () => {
        searchbar.dispatchEvent(new Event('keyup'));
        expect(component.isSearchbarOpened).toBeTruthy();
    });

    /*
     * NT07
     */
    it('should search properly for article "Weniger ist mehr"', () => {
        component.doSearch('Weniger ist');
        expect(component.searchedNews[0].id).toBe(exampleArticle.id);
    });

    /*
     * NT08
     */
    it('should navigate and set isSearchbarOpen to false after 500ms', fakeAsync(() => {
        const navigateSpy = spyOn(router, 'navigate');
        component.navigateToArticle(exampleArticle.id);
        tick(500);
        expect(navigateSpy).toHaveBeenCalledWith(['/app/news/news-detail', { id: exampleArticle.id }]);
        expect(component.isSearchbarOpened).toBe(false);
    }));
});
