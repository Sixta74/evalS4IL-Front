import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Command } from '../../../model/command';
import { CommandService } from '../../../services/command.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Stock } from '../../../model/stock';
import { StockNewComponent } from '../../stock/stock-new/stock-new.component';

@Component({
  selector: 'app-command-detail',
  imports: [RouterLink, StockNewComponent],
  templateUrl: './command-detail.component.html',
  styleUrls: ['./command-detail.component.scss'],
})
export class CommandDetailComponent {
  @Input() command!: Command;
  @Output() deletedCommand = new EventEmitter<number>();

  public edit: boolean = false;
  public originalCommand!: Command;

  constructor(
    private commandService: CommandService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const commandId = Number(this.route.snapshot.params['id']);

    if (!commandId) {
      console.error("Aucun ID trouvé dans l'URL !");
      return;
    }

    this.commandService.getCommandById(commandId).subscribe(
      (command) => {
        this.command = command;
        if (!this.command.stocks) {
          this.command.stocks = [];
        }

        console.log('Stocks liés :', this.command.stocks);
      },
      (error) => {
        console.error('Erreur lors du chargement de la commande:', error);
      }
    );
  }

  refreshStocks(stock: Stock): void {
    this.commandService.getCommandById(this.command.id).subscribe(
      (updatedCommand) => {
        this.command.stocks = updatedCommand.stocks;
      },
      (error) => {
        console.error('Erreur lors du rafraîchissement des stocks :', error);
      }
    );
  }

  EditCommand() {
    this.edit = !this.edit;
    if (this.edit) {
      this.originalCommand = JSON.parse(JSON.stringify(this.command));
    }
  }

  RevertCommand() {
    this.command = JSON.parse(JSON.stringify(this.originalCommand));
    this.edit = false;
  }

  UpdateDate(event: Event) {
    this.command.date = new Date((event.target as HTMLInputElement).value);
  }

  UpdateComment(event: Event) {
    this.command.comment = (event.target as HTMLInputElement).value;
  }

  DeleteCommand() {
    this.commandService.deleteCommand(this.command.id).subscribe(() => {
      this.deletedCommand.emit(this.command.id);
    });
  }
}
