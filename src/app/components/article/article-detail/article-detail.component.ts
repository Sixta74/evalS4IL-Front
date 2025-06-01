import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Article } from '../../../model/article';

@Component({
  selector: 'app-article-detail',
  imports: [RouterLink],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent {
  @Input() article!: Article;
  @Output() parameterUpdated = new EventEmitter<Article>();

  public edit: boolean = false;
  public originalArticle!: Article;
  public windowDisplayStatus: boolean = false;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {
    const articleId: number = +this.route.snapshot.params['id'];
    this.articleService.getArticleById(articleId).subscribe((ret: Article) => {
      this.article = ret;
    });
  }

  UpdateName(event: Event) {
    this.article.name = (event.target as HTMLInputElement).value;
    this.parameterUpdated.emit(this.article);
  }

  UpdateEAN13(event: Event) {
    this.article.EAN13 = (event.target as HTMLInputElement).value;
    this.parameterUpdated.emit(this.article);
  }

  UpdateBrand(event: Event) {
    this.article.brand = (event.target as HTMLInputElement).value;
    this.parameterUpdated.emit(this.article);
  }

  UpdatePrice(event: Event) {
    this.article.price = (event.target as HTMLInputElement).value;
    this.parameterUpdated.emit(this.article);
  }

  EditArticle() {
    this.edit = !this.edit;
    if (this.edit) {
      this.originalArticle = JSON.parse(JSON.stringify(this.article));
    }
  }

  RevertArticle() {
    this.article = JSON.parse(JSON.stringify(this.originalArticle));
    this.edit = false;
  }

  changeVerifyWindowStateArticle() {
    this.windowDisplayStatus = !this.windowDisplayStatus;
  }

  SaveChanges() {
    this.articleService
      .updateArticle(this.article)
      .subscribe((updatedArticle) => {
        console.log('MàJ réussie :', updatedArticle);

        let updatedArticles = this.articleService.articlesSubject.value.map(
          (a) => (a.id === updatedArticle.id ? updatedArticle : a)
        );

        this.articleService.updateArticles(updatedArticles);
        // alert('Mise à jour réussie !');
      });
  }

  DeleteArticle() {
    this.articleService.deleteArticle(this.article.id).subscribe({
      next: () => {
        // alert('Suppression effectuée');
        // Pas besoin de rafraîchir manuellement, la liste est auto-mise à jour
      },
      error: (error) => {
        console.error('Erreur lors de la suppression :', error);
        // alert('Erreur lors de la suppression :');
      },
    });
  }
}
