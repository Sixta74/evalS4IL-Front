import { Component, EventEmitter, Output } from '@angular/core';
import { Command } from '../../../model/command';
import { CommandService } from '../../../services/command.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-command-new',
  imports: [RouterLink],
  templateUrl: './command-new.component.html',
  styleUrls: ['./command-new.component.scss'],
})
export class CommandNewComponent {
  @Output() closeRequest = new EventEmitter<void>();
  @Output() addedCommand = new EventEmitter<Command>();

  command: Command = new Command(new Date(), [], 'Commentaire par défaut');

  constructor(
    private commandService: CommandService,
    private route: ActivatedRoute
  ) {}

  UpdateDate(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.command.date = new Date(inputElement.value);
  }

  UpdateComment(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.command.comment = inputElement.value;
  }

  CreateCommand() {
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
