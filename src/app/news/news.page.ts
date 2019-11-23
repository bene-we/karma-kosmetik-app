import { Component } from '@angular/core';
import { NewsService } from '../shared/services/news.service';
import { Router } from '@angular/router';
import { Article } from '../shared/models/article.model';

@Component({
    selector: 'app-news',
    templateUrl: './news.page.html',
    styleUrls: ['./news.page.scss'],
})
export class NewsPage {

    isSearchbarOpened: boolean;

    searchedNews: Article[];

    constructor(
        public newsService: NewsService,
        public router: Router
    ) { }

    shortenText(text: string): string {
        return text.substr(0, 140) + '...';
    }

    doSearch(term: string) {
        this.isSearchbarOpened = true;
        this.newsService.news.subscribe(
            (res) => {
                res = res.filter(a => {
                    return a.title.toLowerCase().indexOf(term.toLowerCase()) > -1;
                });
                this.searchedNews = res;
            }
        );
    }

    navigateToArticle(id: string) {
        this.router.navigate(['/app/news/news-detail', { id }]);
        setTimeout(() => { this.isSearchbarOpened = false; }, 500);
    }

}
