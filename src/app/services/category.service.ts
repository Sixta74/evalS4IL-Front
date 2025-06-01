import { Injectable } from '@angular/core';
import { APIService } from './api-service.service';
import { HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  readonly ROOT_CATEGORY_URL = APIService.ROOT_URL + '/category';
  readonly PARAM_CAT_ID = 'CategoryId';
  readonly PARAM_CAT_NAME = 'CategoryName';
  readonly PARAM_CAT_DESCRIPTION = 'CategoryDescription';

  constructor(private apiService: APIService) {}

  updateCategories(newCategories: Category[]): void {
    this.categoriesSubject.next(newCategories);
  }

  getAllCategories(): Observable<Category[]> {
    return this.apiService
      .sendGetRequest<Category[]>(this.ROOT_CATEGORY_URL + '/all')
      .pipe(tap((categories) => this.categoriesSubject.next(categories)));
  }

  getCategoryById(id: number): Observable<Category> {
    return this.apiService.sendGetRequest<Category>(
      `${this.ROOT_CATEGORY_URL}/${id}`
    );
  }

  addCategory(category: Category): Observable<Category> {
    let params = new HttpParams()
      .append(this.PARAM_CAT_NAME, category.name)
      .append(this.PARAM_CAT_DESCRIPTION, category.description);

    return this.apiService
      .sendPostRequest<Category>(this.ROOT_CATEGORY_URL + '/add', params)
      .pipe(
        tap((newCategory) => {
          const currentCategories = this.categoriesSubject.value;
          this.categoriesSubject.next([...currentCategories, newCategory]);
        })
      );
  }

  updateCategory(category: Category): Observable<Category> {
    let params = new HttpParams()
      .append(this.PARAM_CAT_ID, category.id.toString())
      .append(this.PARAM_CAT_NAME, category.name)
      .append(this.PARAM_CAT_DESCRIPTION, category.description);

    return this.apiService.sendPutRequest<Category>(
      this.ROOT_CATEGORY_URL + '/update',
      params
    );
  }

  deleteCategory(id: number): Observable<void> {
    return this.apiService
      .sendDeleteRequest<void>(`${this.ROOT_CATEGORY_URL}/delete/${id}`)
      .pipe(
        tap(() => {
          const currentCategories = this.categoriesSubject.value.filter(
            (cat) => cat.id !== id
          );
          this.categoriesSubject.next(currentCategories);
        })
      );
  }
}
