import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Category } from '../../../model/category';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-new',
  imports: [RouterLink],
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.scss'],
})
export class CategoryNewComponent implements OnInit {
  @Output() closeRequest = new EventEmitter<void>();
  @Output() addedCategory = new EventEmitter<Category>();

  category: Category = new Category(0, '', '');
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Erreur lors du chargement des catégories :', error);
      }
    );
  }

  UpdateName(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.category.name = inputElement.value;
  }

  UpdateDescription(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.category.description = inputElement.value;
  }

  CreateCategory() {
    if (!this.category.name || !this.category.description) {
      console.error('Erreur : les champs ne peuvent pas être vides.');
      return;
    }

    this.categoryService.addCategory(this.category).subscribe(
      (response: Category) => {
        this.addedCategory.emit(response);
        this.loadCategories(); // 🔥 Rechargement après ajout
        this.closeRequest.emit();
      },
      (error) => {
        console.error('Erreur lors de l’ajout de la catégorie :', error);
      }
    );
  }

  CloseWindow() {
    this.closeRequest.emit();
  }
}
