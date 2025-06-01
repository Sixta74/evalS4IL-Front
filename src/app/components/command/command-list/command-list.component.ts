import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Command } from '../../../model/command';
import { CommandService } from '../../../services/command.service';
import { RouterLink } from '@angular/router';
import { StockDetailComponent } from '../../stock/stock-detail/stock-detail.component';

@Component({
  selector: 'app-command-list',
  imports: [RouterLink, StockDetailComponent],
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.scss'],
})
export class CommandListComponent {
  allCommands: Command[] = [];

  constructor(private commandService: CommandService) {
    let obs: Observable<Command[]> = commandService.getAllCommands();
    this.allCommands = [];

    obs.subscribe((data: Command[]) => {
      data.forEach((tmpCommand: Command) => {
        let curCommand: Command = new Command(
          tmpCommand.date,
          tmpCommand.stocks,
          tmpCommand.comment
        );
        curCommand.setId(tmpCommand.id);
        this.allCommands.push(curCommand);
      });
    });
  }

  getName(): string {
    return 'CommandListComponent';
  }
}
