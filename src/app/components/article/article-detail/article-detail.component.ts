import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Article } from '../../../model/article';
import { Category } from '../../../model/category';
import { BehaviorSubject } from 'rxjs';
import { Stock } from '../../../model/stock';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-article-detail',
  imports: [RouterLink],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  @Input() article!: Article;
  @Output() parameterUpdated = new EventEmitter<Article>();

  public articlesSubject = new BehaviorSubject<Article[]>([]);

  public edit: boolean = false;
  public originalArticle!: Article;
  public windowDisplayStatus: boolean = false;
  categories: Category[] = [];

  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private stockService: StockService
  ) {}

  ngOnInit(): void {
    const articleId: number = +this.route.snapshot.params['id'];

    this.articleService.getArticleById(articleId).subscribe((ret: Article) => {
      this.article = ret;

      this.stockService
        .getStocksByArticleId(articleId)
        .subscribe((stocks: Stock[]) => {
          this.article.stocks = stocks;
        });
    });

    this.loadCategories();
  }

  getTotalStockQuantity(): number {
    if (!this.article || !this.article.stocks) {
      return 0;
    }

    return this.article.stocks.reduce((total, stock) => {
      return stock.transferType === 'IN'
        ? total + stock.quantity
        : total - stock.quantity;
    }, 0);
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    );
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

  UpdateCategory(event: Event) {
    const selectedCategoryId = Number(
      (event.target as HTMLSelectElement).value
    );
    const selectedCategory = this.categories.find(
      (category) => category.id === selectedCategoryId
    );

    if (selectedCategory) {
      this.article.category = selectedCategory;
    }
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
    this.articleService.updateArticle(this.article).subscribe(
      (updatedArticle) => {
        console.log('MàJ réussie :', updatedArticle);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour :', error);
      }
    );
  }

  DeleteArticle() {
    this.articleService.deleteArticle(this.article.id).subscribe({
      next: () => {},
      error: (error) => {
        console.error('Erreur lors de la suppression :', error);
      },
    });
  }
}
