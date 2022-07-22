import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from './interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _categories = new BehaviorSubject<Category[]>([]);
  private dataStore: { categories: Category[] } = { categories: [] };

  constructor(private http: HttpClient) { }

  loadCategories(params: object) {
    this.http.get<Category[]>('/api/categories').subscribe(
      data => {
        this.dataStore.categories = data;
        this._categories.next(Object.assign({}, this.dataStore).categories);
      }
    );
  }

  getCategories(): Observable<Category[]> {
    return this._categories.asObservable();
  }
}
