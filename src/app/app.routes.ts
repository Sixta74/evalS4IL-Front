import { Routes } from '@angular/router';
import { ArticleDetailComponent } from './components/article/article-detail/article-detail.component';
import { ArticleListComponent } from './components/article/article-list/article-list.component';
import { ArticleNewComponent } from './components/article/article-new/article-new.component';

import { CommandListComponent } from './components/command/command-list/command-list.component';
import { CommandNewComponent } from './components/command/command-new/command-new.component';

import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryNewComponent } from './components/category/category-new/category-new.component';

import { NotFoundComponent } from './technical/not-found/not-found.component';
import { StockNewComponent } from './components/stock/stock-new/stock-new.component';
import { CommandDetailComponent } from './components/command/command-detail/command-detail.component';

export const routes: Routes = [
  //   { path: '', component: ConnectionFormComponent },
  { path: 'article', component: ArticleListComponent },
  { path: 'article/new', component: ArticleNewComponent },
  { path: 'article/:id', component: ArticleDetailComponent },

  { path: 'command', component: CommandListComponent },
  { path: 'command/new', component: CommandNewComponent },
  { path: 'command/:id', component: CommandDetailComponent },

  { path: 'category', component: CategoryListComponent },
  { path: 'category/new', component: CategoryNewComponent },

  { path: 'stock/new/:commandId', component: StockNewComponent },

  { path: '**', pathMatch: 'full', component: NotFoundComponent }, // NE RIEN METTRE DERIERE
];
