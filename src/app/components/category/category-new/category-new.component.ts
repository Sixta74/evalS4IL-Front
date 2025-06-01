import { Component, EventEmitter, Output } from '@angular/core';
import { Category } from '../../../model/category';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-new',
  imports: [RouterLink],
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.scss'],
})
export class CategoryNewComponent {
  @Output() closeRequest = new EventEmitter<void>();
  @Output() addedCategory = new EventEmitter<Category>();

  category: Category = new Category(
    999999,
    'Nom de la catégorie',
    'Description courte'
  );

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  UpdateName(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.category.name = inputElement.value;
  }

  UpdateDescription(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.category.description = inputElement.value;
  }

  CreateCategory() {
    this.categoryService.addCategory(this.category).subscribe(
      (response: Category) => {
        this.addedCategory.emit(response);
        this.categoryService
          .getAllCategories()
          .subscribe((updatedCategories) => {
            this.categoryService.categoriesSubject.next(updatedCategories);
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
