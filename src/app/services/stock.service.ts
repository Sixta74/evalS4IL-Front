import { Injectable } from '@angular/core';
import { APIService } from './api-service.service';
import { HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Stock } from '../model/stock';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private stocksSubject = new BehaviorSubject<Stock[]>([]);
  stocks$ = this.stocksSubject.asObservable();

  readonly ROOT_STOCK_URL = APIService.ROOT_URL + '/stock';
  readonly PARAM_STOCK_ID = 'StockId';
  readonly PARAM_STOCK_DATE = 'StockDate';
  readonly PARAM_STOCK_ARTICLE_ID = 'ArticleId';
  readonly PARAM_STOCK_QUANTITY = 'StockQuantity';
  readonly PARAM_STOCK_TRANSFER_TYPE = 'StockTransferType';
  readonly PARAM_STOCK_COMMENT = 'StockComment';

  constructor(private apiService: APIService) {}

  updateStocks(newStocks: Stock[]): void {
    this.stocksSubject.next(newStocks);
  }

  getAllStocks(): Observable<Stock[]> {
    return this.apiService
      .sendGetRequest<Stock[]>(this.ROOT_STOCK_URL + '/all')
      .pipe(tap((stocks) => this.stocksSubject.next(stocks)));
  }

  getStockById(id: number): Observable<Stock> {
    return this.apiService.sendGetRequest<Stock>(
      `${this.ROOT_STOCK_URL}/${id}`
    );
  }

  addStock(stock: Stock): Observable<Stock> {
    let params = new HttpParams()
      .append(this.PARAM_STOCK_DATE, stock.date.toISOString().split('T')[0]) // Format YYYY-MM-DD
      .append(this.PARAM_STOCK_ARTICLE_ID, stock.article.id.toString())
      .append(this.PARAM_STOCK_QUANTITY, stock.quantity.toString())
      .append(this.PARAM_STOCK_TRANSFER_TYPE, stock.transferType)
      .append(this.PARAM_STOCK_COMMENT, stock.comment);

    return this.apiService
      .sendPostRequest<Stock>(this.ROOT_STOCK_URL + '/add', params)
      .pipe(
        tap((newStock) => {
          const currentStocks = this.stocksSubject.value;
          this.stocksSubject.next([...currentStocks, newStock]);
        })
      );
  }

  updateStock(stock: Stock): Observable<Stock> {
    let params = new HttpParams()
      .append(this.PARAM_STOCK_ID, stock.id.toString())
      .append(this.PARAM_STOCK_DATE, stock.date.toISOString().split('T')[0]) // Format YYYY-MM-DD
      .append(this.PARAM_STOCK_ARTICLE_ID, stock.article.id.toString())
      .append(this.PARAM_STOCK_QUANTITY, stock.quantity.toString())
      .append(this.PARAM_STOCK_TRANSFER_TYPE, stock.transferType)
      .append(this.PARAM_STOCK_COMMENT, stock.comment);

    return this.apiService.sendPutRequest<Stock>(
      this.ROOT_STOCK_URL + '/update',
      params
    );
  }

  deleteStock(id: number): Observable<void> {
    return this.apiService
      .sendDeleteRequest<void>(`${this.ROOT_STOCK_URL}/delete/${id}`)
      .pipe(
        tap(() => {
          const currentStocks = this.stocksSubject.value.filter(
            (stock) => stock.id !== id
          );
          this.stocksSubject.next(currentStocks);
        })
      );
  }
}
