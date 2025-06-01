import { Routes } from '@angular/router';
import { ArticleDetailComponent } from './components/article/article-detail/article-detail.component';
import { ArticleListComponent } from './components/article/article-list/article-list.component';
import { ArticleNewComponent } from './components/article/article-new/article-new.component';

import { CommandListComponent } from './components/command/command-list/command-list.component';
import { CommandNewComponent } from './components/command/command-new/command-new.component';

import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryNewComponent } from './components/category/category-new/category-new.component';

import { NotFoundComponent } from './technical/not-found/not-found.component';

export const routes: Routes = [
  //   { path: '', component: ConnectionFormComponent },
  { path: 'article', component: ArticleListComponent },
  { path: 'article/:id', component: ArticleDetailComponent },
  { path: 'article/new', component: ArticleNewComponent },

  { path: 'command', component: CommandListComponent },
  { path: 'command/new', component: CommandNewComponent },

  { path: 'category', component: CategoryListComponent },
  { path: 'category/new', component: CategoryNewComponent },

  { path: '**', pathMatch: 'full', component: NotFoundComponent }, // NE RIEN METTRE DERIERE
];
