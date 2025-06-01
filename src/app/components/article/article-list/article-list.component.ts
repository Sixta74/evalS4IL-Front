import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../../../model/article';
import { ArticleService } from '../../../services/article.service';
import { ArticleDetailComponent } from '../article-detail/article-detail.component';
import { RouterLink } from '@angular/router';
import { StockService } from '../../../services/stock.service';
import { Stock } from '../../../model/stock';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  imports: [ArticleDetailComponent, RouterLink],
})
export class ArticleListComponent {
  allArticles: Article[] = [];

  constructor(
    private articleService: ArticleService,
    private stockService: StockService
  ) {
    let obs: Observable<Article[]> = articleService.getAllArticles();
    this.allArticles = [];

    obs.subscribe((data: Article[]) => {
      data.forEach((tmpArticle: Article) => {
        let curArticle: Article = new Article(
          tmpArticle.id,
          tmpArticle.name,
          tmpArticle.EAN13,
          tmpArticle.brand,
          tmpArticle.picture_URL,
          tmpArticle.price,
          tmpArticle.description
        );
        this.stockService
          .getStocksByArticleId(tmpArticle.id)
          .subscribe((stocks: Stock[]) => {
            curArticle.stocks = stocks;
          });

        this.allArticles.push(curArticle);
      });
    });
  }

  getName(): string {
    return 'ArticleListComponent';
  }
}
