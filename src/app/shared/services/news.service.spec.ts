import { async, TestBed } from '@angular/core/testing';

import { NewsService } from './news.service';
import { Article } from '../models/article.model';
import { exampleArticle } from '../../../mocks/example-article';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';


const articles: Article[] = [exampleArticle];

const articles$ = of(articles);
const article$ = of(exampleArticle);

const documentStub = {
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(article$)
};

const collectionStub = {
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(articles$),
    doc: jasmine.createSpy('doc').and.returnValue(documentStub)
};

const afStoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(collectionStub)
};


describe('NewsService', () => {
    let service: NewsService;
    let afStore: AngularFirestore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                NewsService,
                { provide: AngularFirestore, useValue: afStoreStub }
            ]
        });

        service = TestBed.get(NewsService);
        afStore = TestBed.get(AngularFirestore);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    /*
     * NT01
     */
    it('should query firestore for news', () => {
        expect(afStoreStub.collection).toHaveBeenCalledWith('news');
    });

    /*
     * NT02
     */
    it('field news should emit an array with one example article', () => {
        service.news.subscribe(n => {
            expect(n.length).toBe(1);
            expect(n).toEqual([exampleArticle]);
        });
    });

    /*
     * NT03
     */
    it('field newsDelayed should delay the emitted value by at least 1500ms', async(() => {
        const startTime = Date.now();
        service.newsDelayed.subscribe(() => {
            const diff = Date.now() - startTime;
            expect(diff).toBeGreaterThanOrEqual(1500);
        });
    }));

    /*
     * NT04
     */
    it('getArticleById should return the correct article', () => {
        const testArticle = service.getArticleById(exampleArticle.id);
        testArticle.subscribe(a => expect(a).toEqual(exampleArticle));
    });
});
