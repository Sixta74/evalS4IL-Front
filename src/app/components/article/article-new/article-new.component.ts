import { Component, EventEmitter, Output } from '@angular/core';
import { Article } from '../../../model/article';
import { ArticleService } from '../../../services/article.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-article-new',
  imports: [RouterLink],
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.scss'],
})
export class ArticleNewComponent {
  @Output() closeRequest = new EventEmitter<void>();
  @Output() addedArticle = new EventEmitter<Article>();

  article: Article = new Article(
    999999,
    'Nom',
    '0000000000000',
    'Marque',
    '',
    '0',
    'Description'
  );

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  UpdateName(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.article.name = inputElement.value;
  }

  UpdateEAN13(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.article.EAN13 = inputElement.value;
  }

  UpdateBrand(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.article.brand = inputElement.value;
  }

  UpdatePrice(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.article.price = inputElement.value;
  }

  UpdateDescription(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.article.description = inputElement.value;
  }

  CreateArticle() {
    this.articleService.addArticle(this.article).subscribe(
      (response: Article) => {
        this.addedArticle.emit(response);
        this.articleService.getAllArticles().subscribe((updatedArticles) => {
          this.articleService.articlesSubject.next(updatedArticles);
        });
        this.closeRequest.emit();
      },
      (error) => {
        console.error('Erreur :', error);
      }
    );
  }

  CloseWindow() {
    this.closeRequest.emit();
  }
}
