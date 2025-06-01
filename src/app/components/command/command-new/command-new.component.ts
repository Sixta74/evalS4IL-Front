import { Component, EventEmitter, Output } from '@angular/core';
import { Command } from '../../../model/command';
import { CommandService } from '../../../services/command.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Stock } from '../../../model/stock';
import { StockService } from '../../../services/stock.service';
import { StockNewComponent } from '../../stock/stock-new/stock-new.component';

@Component({
  selector: 'app-command-new',
  imports: [RouterLink, StockNewComponent],
  templateUrl: './command-new.component.html',
  styleUrls: ['./command-new.component.scss'],
})
export class CommandNewComponent {
  @Output() closeRequest = new EventEmitter<void>();
  @Output() addedCommand = new EventEmitter<Command>();

  windowDisplayStatus: boolean = false;

  command: Command = new Command(new Date(), [], 'Commentaire par défaut');
  stocks: Stock[] = [];

  constructor(
    private commandService: CommandService,
    private route: ActivatedRoute,
    stockService: StockService
  ) {}

  UpdateDate(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.command.date = new Date(inputElement.value);
  }

  UpdateComment(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.command.comment = inputElement.value;
  }

  AddStockWindow() {
    this.windowDisplayStatus = !this.windowDisplayStatus;
  }

  AddStock() {
    this.stocks;

    this.stocks.push();
  }

  RemoveStock(stock: Stock) {
    this.stocks = this.stocks.filter((s) => s !== stock);
  }

  UpdateStockArticle(event: Event, stock: Stock) {
    const inputElement = event.target as HTMLInputElement;
    stock.article.name = inputElement.value;
  }

  UpdateStockQuantity(event: Event, stock: Stock) {
    const inputElement = event.target as HTMLInputElement;
    stock.quantity = Number(inputElement.value);
  }

  UpdateStockTransferType(event: Event, stock: Stock) {
    const selectElement = event.target as HTMLSelectElement;
    stock.transferType = selectElement.value;
  }

  UpdateStockComment(event: Event, stock: Stock) {
    const inputElement = event.target as HTMLInputElement;
    stock.comment = inputElement.value;
  }

  CreateCommand() {
    this.command.stocks = this.stocks;

    this.commandService.addCommand(this.command).subscribe(
      (response: Command) => {
        this.addedCommand.emit(response);
        this.commandService.getAllCommands().subscribe((updatedCommands) => {
          this.commandService.commandsSubject.next(updatedCommands);
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
