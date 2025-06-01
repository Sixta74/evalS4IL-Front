import { Injectable } from '@angular/core';
import { APIService } from './api-service.service';
import { HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Command } from '../model/command';

@Injectable({
  providedIn: 'root',
})
export class CommandService {
  public commandsSubject = new BehaviorSubject<Command[]>([]);
  commands$ = this.commandsSubject.asObservable();

  readonly ROOT_COMMAND_URL = APIService.ROOT_URL + '/command';
  readonly PARAM_COM_ID = 'CommandId';
  readonly PARAM_COM_DATE = 'CommandDate';
  readonly PARAM_COM_COMMENT = 'CommandComment';

  constructor(private apiService: APIService) {}

  updateCommands(newCommands: Command[]): void {
    this.commandsSubject.next(newCommands);
  }

  getAllCommands(): Observable<Command[]> {
    return this.apiService
      .sendGetRequest<Command[]>(this.ROOT_COMMAND_URL + '/all')
      .pipe(tap((commands) => this.commandsSubject.next(commands)));
  }

  getCommandById(id: number): Observable<Command> {
    return this.apiService.sendGetRequest<Command>(
      `${this.ROOT_COMMAND_URL}/${id}`
    );
  }

  addCommand(command: Command): Observable<Command> {
    let params = new HttpParams()
      .append(this.PARAM_COM_DATE, command.date.toISOString().split('T')[0]) // Format YYYY-MM-DD
      .append(this.PARAM_COM_COMMENT, command.comment);

    return this.apiService
      .sendPostRequest<Command>(this.ROOT_COMMAND_URL + '/add', params)
      .pipe(
        tap((newCommand) => {
          const currentCommands = this.commandsSubject.value;
          this.commandsSubject.next([...currentCommands, newCommand]);
        })
      );
  }

  updateCommand(command: Command): Observable<Command> {
    let params = new HttpParams()
      .append(this.PARAM_COM_ID, command.id.toString())
      .append(this.PARAM_COM_DATE, command.date.toISOString().split('T')[0]) // Format YYYY-MM-DD
      .append(this.PARAM_COM_COMMENT, command.comment);

    return this.apiService.sendPutRequest<Command>(
      this.ROOT_COMMAND_URL + '/update',
      params
    );
  }

  deleteCommand(id: number): Observable<void> {
    return this.apiService
      .sendDeleteRequest<void>(`${this.ROOT_COMMAND_URL}/delete/${id}`)
      .pipe(
        tap(() => {
          const currentCommands = this.commandsSubject.value.filter(
            (com) => com.id !== id
          );
          this.commandsSubject.next(currentCommands);
        })
      );
  }
}
