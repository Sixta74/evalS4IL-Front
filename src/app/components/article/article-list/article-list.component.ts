import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../../../model/article';
import { ArticleService } from '../../../services/article.service';
import { ArticleDetailComponent } from '../article-detail/article-detail.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  imports: [ArticleDetailComponent, RouterLink],
})
export class ArticleListComponent {
  allArticles: Article[] = [];

  constructor(private articleService: ArticleService) {
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
        this.allArticles.push(curArticle);
      });
    });
  }

  getName(): string {
    return 'ArticleListComponent';
  }
}

//   ngOnInit(): void {
//     this.articleService.articles$.subscribe((articles) => {
//       this.allArticles = articles;
//     });

//     // Chargement initial avec les données actuelles
//     this.articleService.getAllArticles().subscribe((data) => {
//       this.articleService.articlesSubject.next(data);
//     });
//   }

//   RemoveArticle(removedArticle: Article) {
//     this.allArticles = this.allArticles.filter(
//       (article) => article != removedArticle
//     );
//   }

//   AddArticleToList(addedArticle: Article) {
//     this.allArticles.push(addedArticle);
//   }

//   changeAddWindowStateArticle() {
//     this.windowDisplayStatus = !this.windowDisplayStatus;
//   }

//   updateWindowStatus(newStatus: boolean) {
//     this.windowDisplayStatus = newStatus;
//   }

//   getName(): string {
//     return 'ArticleListComponent';
//   }
