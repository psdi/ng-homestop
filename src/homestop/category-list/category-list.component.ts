import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { CategoriesDataSource } from './categories.datasource';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  dataSource: CategoriesDataSource;
  columnsToDisplay: string[] = ['number', 'name', 'abbreviation', 'color', 'actions'];

  constructor(private categoryService: CategoryService) {
    this.dataSource = new CategoriesDataSource(this.categoryService);
  }

  ngOnInit(): void {
    this.dataSource.loadCategories();
  }

}
