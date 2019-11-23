import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NewsDetailPage } from './news-detail.page';
import { NewsService } from '../../shared/services/news.service';
import { NewsServiceMock } from '../../../mocks/news-service.mock';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteMock } from '../../../mocks/activated-route.mock';
import { exampleArticle } from '../../../mocks/example-article';
import { By } from '@angular/platform-browser';

describe('NewsDetailPage', () => {
    let component: NewsDetailPage;
    let fixture: ComponentFixture<NewsDetailPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [NewsDetailPage],
            providers: [
                { provide: NewsService, useClass: NewsServiceMock },
                { provide: ActivatedRoute, useClass: ActivatedRouteMock }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewsDetailPage);
        component = fixture.componentInstance;

        const activatedRoute = fixture.debugElement.injector.get(ActivatedRoute) as any;
        activatedRoute.testParamMap = { id: 'XjHHHyEsYUD99IZq3KGH' };

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    /*
     * NT09
     */
    it('should get the id from the URL parameters and retrieve the corresponding article from the NewsService', fakeAsync(() => {
        component.ngOnInit();

        // We wait for all pending promises to be resolved.
        tick();

        component.article.subscribe(
            (a) => expect(a.title).toBe(exampleArticle.title)
        );
    }));

    /*
     * NT10
     */
    it('should fill the template with the data of the article', () => {
        component.ngOnInit();

        const debugElement: DebugElement = fixture.debugElement;
        const textDe = debugElement.query(By.css('.article-title'));
        const ionText: HTMLElement = textDe.nativeElement;
        expect(ionText.textContent).toEqual(exampleArticle.title);
    });
});
