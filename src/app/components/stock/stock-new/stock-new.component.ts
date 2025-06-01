import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Stock } from '../../../model/stock';
import { StockService } from '../../../services/stock.service';
import { ArticleService } from '../../../services/article.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Article } from '../../../model/article';

@Component({
  selector: 'app-stock-new',
  imports: [RouterLink],
  templateUrl: './stock-new.component.html',
  styleUrls: ['./stock-new.component.scss'],
})
export class StockNewComponent implements OnInit {
  @Output() closeRequest = new EventEmitter<void>();
  @Output() addedStock = new EventEmitter<Stock>();

  stock: Stock = new Stock(new Date(), 1, 'IN', 'Commentaire par défaut');
  articles: Article[] = [];

  constructor(
    private stockService: StockService,
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(): void {
    this.articleService.getAllArticles().subscribe(
      (articles) => {
        this.articles = articles;
      },
      (error) => {
        console.error('Erreur lors du chargement des articles:', error);
      }
    );
  }

  UpdateDate(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.stock.date = new Date(inputElement.value);
  }

  UpdateQuantity(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.stock.quantity = Number(inputElement.value);
  }

  UpdateTransferType(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.stock.transferType = selectElement.value;
  }

  UpdateComment(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.stock.comment = inputElement.value;
  }

  UpdateArticle(event: Event) {
    const selectedArticleId = Number((event.target as HTMLSelectElement).value);
    const selectedArticle = this.articles.find(
      (article) => article.id === selectedArticleId
    );

    if (selectedArticle) {
      this.stock.article = selectedArticle;
    }
  }

  CreateStock() {
    this.stockService.addStock(this.stock).subscribe(
      (response: Stock) => {
        this.addedStock.emit(response);
        this.stockService.getAllStocks().subscribe((updatedStocks) => {
          this.stockService.stocksSubject.next(updatedStocks);
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
