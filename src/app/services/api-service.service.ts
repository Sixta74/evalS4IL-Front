import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  public static ROOT_URL: string = environment.apiUrl;

  public static DEFAULT_HEADERS: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  public static FORM_HEADERS: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  private httpError(error: HttpErrorResponse): Observable<never> {
    let msg: string = '';

    if (
      typeof ErrorEvent !== 'undefined' &&
      error.error instanceof ErrorEvent
    ) {
      msg = error.error.message;
    } else {
      msg =
        'Status: ' +
        error.status +
        '\n' +
        'Message: ' +
        error.message +
        '\n' +
        'Detail: ' +
        (typeof error.error === 'string'
          ? error.error
          : JSON.stringify(error.error));
    }

    console.error(msg);
    return throwError(() => new Error(msg));
  }

  public sendGetRequest<T>(url: string): Observable<T> {
    let httpOptions: Object = {
      observe: 'body',
      responseType: 'json',
      headers: APIService.DEFAULT_HEADERS,
    };
    return this.httpClient
      .get<T>(url, httpOptions)
      .pipe(retry(1), catchError(this.httpError));
  }

  public sendDeleteRequest<T>(url: string): Observable<T> {
    let httpOptions: Object = {
      observe: 'body',
      responseType: 'text' as 'json',
      headers: APIService.DEFAULT_HEADERS,
    };
    return this.httpClient
      .delete<T>(url, httpOptions)
      .pipe(retry(1), catchError(this.httpError));
  }

  public sendPostRequest<T>(url: string, params: HttpParams): Observable<T> {
    let httpOptions: Object = {
      observe: 'response',
      responseType: 'json',
      headers: APIService.FORM_HEADERS,
    };
    return this.httpClient
      .post<T>(url, params, httpOptions)
      .pipe(retry(1), catchError(this.httpError));
  }

  public sendPutRequest<T>(url: string, params: HttpParams): Observable<T> {
    let httpOptions: Object = {
      observe: 'response',
      responseType: 'json',
      headers: APIService.FORM_HEADERS,
    };
    return this.httpClient
      .put<T>(url, params, httpOptions)
      .pipe(retry(1), catchError(this.httpError));
  }

  constructor(private httpClient: HttpClient) {}
}
