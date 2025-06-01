import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Stock } from '../../../model/stock';
import { StockService } from '../../../services/stock.service';
import { ArticleService } from '../../../services/article.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Article } from '../../../model/article';
import { CommandService } from '../../../services/command.service';

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
  commandId!: number; // ✅ Ajout de l'ID de commande

  constructor(
    private stockService: StockService,
    private articleService: ArticleService,
    private commandService: CommandService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.commandId = Number(this.route.snapshot.params['commandId']);
    this.fetchArticles();
  }

  fetchArticles(): void {
    this.articleService.getAllArticles().subscribe(
      (articles) => {
        console.log('Articles récupérés :', articles);
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
    console.log('Date mise à jour :', this.stock.date.toISOString());
  }

  UpdateQuantity(event: Event) {
    this.stock.quantity = Number((event.target as HTMLInputElement).value);
  }

  UpdateTransferType(event: Event) {
    this.stock.transferType = (event.target as HTMLSelectElement).value;
  }

  UpdateComment(event: Event) {
    this.stock.comment = (event.target as HTMLInputElement).value;
  }

  UpdateArticle(event: Event) {
    const selectElement = event.target as HTMLSelectElement;

    const selectedArticleId = Number(selectElement.value);

    const selectedArticle = this.articles.find(
      (article) => article.id === selectedArticleId
    );
    if (selectedArticle) {
      this.stock.article = selectedArticle;
    } else {
    }
  }

  CreateStock() {
    if (!this.stock.article || !this.stock.article.id) {
      console.error('Article non sélectionné !');
      return;
    }

    this.articleService
      .getArticleById(this.stock.article.id)
      .subscribe((article) => {
        this.stock.article = article;

        this.stockService
          .addStock(this.commandId, this.stock)
          .subscribe((response: Stock) => {
            this.addedStock.emit(response);

            this.commandService
              .getCommandById(this.commandId)
              .subscribe((updatedCommand) => {
                updatedCommand.stocks.push(response);
                this.commandService.updateCommand(updatedCommand).subscribe();
              });

            this.closeRequest.emit();
          });
      });
  }

  CloseWindow() {
    this.closeRequest.emit();
  }
}
