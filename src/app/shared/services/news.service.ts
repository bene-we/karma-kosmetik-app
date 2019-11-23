import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Article } from '../models/article.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    news = new ReplaySubject<Article[]>(2);

    /*
     * Delay news to show loading animation
     */
    newsDelayed = this.news.pipe(delay(1500));

    constructor(private afStore: AngularFirestore) {
        this.getArticles().subscribe((a) => {
            this.news.next(a);
        });
    }

    private getArticles(): Observable<Article[]> {
        return this.afStore.collection<Article>('news').valueChanges();
    }

    getArticleById(id: string): Observable<Article> {
        return this.afStore
            .collection<Article>('news')
            .doc<Article>(id)
            .valueChanges();
    }

}
