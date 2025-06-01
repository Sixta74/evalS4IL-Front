import { Injectable } from '@angular/core';
import { APIService } from './api-service.service';
import { HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Article } from '../model/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  public articlesSubject = new BehaviorSubject<Article[]>([]);
  articles$ = this.articlesSubject.asObservable();

  readonly ROOT_ARTICLE_URL = APIService.ROOT_URL + '/article';
  readonly PARAM_ART_ID = 'ArticleId';
  readonly PARAM_ART_NAME = 'ArticleName';
  readonly PARAM_ART_EAN13 = 'ArticleEAN13';
  readonly PARAM_ART_BRAND = 'ArticleBrand';
  readonly PARAM_ART_PICTURE = 'ArticlePicture';
  readonly PARAM_ART_PRICE = 'ArticlePrice';
  readonly PARAM_ART_DESCRIPTION = 'ArticleDescription';
  readonly PARAM_ART_CATEGORY_ID = 'CategoryId';
  readonly PARAM_ART_STOCK_IDS = 'StockIds';

  constructor(private apiService: APIService) {}

  updateArticles(newArticles: Article[]): void {
    this.articlesSubject.next(newArticles);
  }

  getAllArticles(): Observable<Article[]> {
    return this.apiService.sendGetRequest<Article[]>(
      this.ROOT_ARTICLE_URL + '/all'
    );
  }

  getArticleById(id: number): Observable<Article> {
    return this.apiService.sendGetRequest<Article>(
      `${this.ROOT_ARTICLE_URL}/${id}`
    );
  }

  addArticle(article: Article): Observable<Article> {
    let params = new HttpParams()
      .append(this.PARAM_ART_NAME, article.name)
      .append(this.PARAM_ART_EAN13, article.EAN13)
      .append(this.PARAM_ART_BRAND, article.brand)
      .append(this.PARAM_ART_PICTURE, article.picture_URL)
      .append(this.PARAM_ART_PRICE, article.price.toString())
      .append(this.PARAM_ART_DESCRIPTION, article.description)
      .append(
        this.PARAM_ART_CATEGORY_ID,
        article.category?.id.toString() || ''
      );

    return this.apiService
      .sendPostRequest<Article>(this.ROOT_ARTICLE_URL + '/add', params)
      .pipe(
        tap((newArticle) => {
          const currentArticles = this.articlesSubject.value;
          this.articlesSubject.next([...currentArticles, newArticle]);
        })
      );
  }

  updateArticle(article: Article): Observable<Article> {
    let params = new HttpParams()
      .append(this.PARAM_ART_ID, article.id.toString())
      .append(this.PARAM_ART_NAME, article.name)
      .append(this.PARAM_ART_EAN13, article.EAN13)
      .append(this.PARAM_ART_BRAND, article.brand)
      .append(this.PARAM_ART_PICTURE, article.picture_URL)
      .append(this.PARAM_ART_PRICE, article.price.toString())
      .append(this.PARAM_ART_DESCRIPTION, article.description)
      .append(this.PARAM_ART_CATEGORY_ID, article.category?.id.toString() || '')
      .append(
        this.PARAM_ART_STOCK_IDS,
        article.stocks.map((stock) => stock.id.toString()).join(',')
      );

    return this.apiService.sendPutRequest<Article>(
      this.ROOT_ARTICLE_URL + '/update',
      params
    );
  }

  deleteArticle(id: number): Observable<void> {
    return this.apiService
      .sendDeleteRequest<void>(`${this.ROOT_ARTICLE_URL}/delete/${id}`)
      .pipe(
        tap(() => {
          const currentArticles = this.articlesSubject.value.filter(
            (article) => article.id !== id
          );
          this.articlesSubject.next(currentArticles);
        })
      );
  }
}
