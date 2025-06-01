import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../../model/category';
import { CategoryService } from '../../../services/category.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  allCategories: Category[] = [];

  constructor(private categoryService: CategoryService) {
    let obs: Observable<Category[]> = categoryService.getAllCategories();
    this.allCategories = [];

    obs.subscribe((data: Category[]) => {
      data.forEach((tmpCategory: Category) => {
        let curCategory: Category = new Category(
          tmpCategory.id,
          tmpCategory.name,
          tmpCategory.description
        );
        this.allCategories.push(curCategory);
      });
    });
  }

  DeleteCategory(categoryId: number) {
    this.categoryService.deleteCategory(categoryId).subscribe(() => {
      this.allCategories = this.allCategories.filter(
        (cat) => cat.id !== categoryId
      );
    });
  }

  getName(): string {
    return 'CategoryListComponent';
  }
}
