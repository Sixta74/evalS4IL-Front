import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Command } from '../../../model/command';
import { CommandService } from '../../../services/command.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-command-detail',
    imports: [RouterLink],
  templateUrl: './command-detail.component.html',
  styleUrls: ['./command-detail.component.scss'],
})
export class CommandDetailComponent {
  @Input() command!: Command;
  @Output() deletedCommand = new EventEmitter<number>();

  public edit: boolean = false;
  public originalCommand!: Command;

  constructor(private commandService: CommandService) {}

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