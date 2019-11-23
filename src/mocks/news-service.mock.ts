import { Observable, of, ReplaySubject } from 'rxjs';
import { Article } from '../app/shared/models/article.model';
import { delay } from 'rxjs/operators';
import { exampleArticle } from './example-article';

export class NewsServiceMock {
    news = new ReplaySubject<Article[]>(2);
    newsDelayed = this.news.pipe(delay(1500));


    constructor() {
        this.getArticles().subscribe((a) => {
            this.news.next(a);
        });
    }

    // noinspection JSMethodCanBeStatic
    private getArticles(): Observable<Article[]> {
        return of([exampleArticle]);
    }

    // noinspection JSMethodCanBeStatic,JSUnusedLocalSymbols
    getArticleById(id: string): Observable<Article> {
        return of(exampleArticle);
    }

}
