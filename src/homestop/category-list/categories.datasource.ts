import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";
import { CategoryService } from "../category.service";
import { Category } from "../interfaces/category";

export class CategoriesDataSource implements DataSource<Category> {

  private categoriesSubject = new BehaviorSubject<Category[]>([]);

  constructor(private service: CategoryService) {}

  connect(collectionViewer: CollectionViewer): Observable<readonly Category[]> {
    return this.service.getCategories();
    // return this.categoriesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.categoriesSubject.complete();
  }

  loadCategories(params: object = {}): void {
    this.service.loadCategories(params);
  }
}
