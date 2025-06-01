import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Article } from '../../../model/article';
import { ArticleService } from '../../../services/article.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Category } from '../../../model/category';
import { CategoryService } from '../../../services/category.service';
import { Stock } from '../../../model/stock';
import { StockService } from '../../../services/stock.service';

@Component({
  selector: 'app-article-new',
  imports: [RouterLink],
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.scss'],
})
export class ArticleNewComponent implements OnInit {
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
  category: Category = new Category(0, '', '');
  categories: Category[] = [];
  stocks: Stock[] = [];
  articles: Article[] = [];

  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private stockService: StockService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.fetchArticles();
    this.fetchStock();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Erreur lors du chargement des catégories :', error);
      }
    );
  }

  fetchArticles(): void {
    this.articleService.getAllArticles().subscribe(
      (articles) => {
        this.articles = articles;
      },
      (error) => {
        console.error('Erreur lors du chargement des articles :', error);
      }
    );
  }

  fetchStock(): void {
    this.stockService.getAllStocks().subscribe(
      (stocks) => {
        this.stocks = stocks;
      },
      (error) => {
        console.error('Erreur lors du chargement des stocks :', error);
      }
    );
  }

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

  UpdatePictureUrl(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.article.picture_URL = inputElement.value;
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

  CreateArticle() {
    this.articleService.addArticle(this.article).subscribe(
      (response: Article) => {
        this.addedArticle.emit(response);
        this.fetchArticles();
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
