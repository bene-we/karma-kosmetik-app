import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../shared/models/article.model';
import { Observable } from 'rxjs';
import { NewsService } from '../../shared/services/news.service';

@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.page.html',
    styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {

    article: Observable<Article>;

    constructor(
        private route: ActivatedRoute,
        private newsService: NewsService
    ) { }

    ngOnInit() {
        const articleId = this.route.snapshot.paramMap.get('id');
        this.article = this.newsService.getArticleById(articleId);
    }

}
