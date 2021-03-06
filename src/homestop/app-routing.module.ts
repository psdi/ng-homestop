import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { FinancesComponent } from './finances/finances.component';

const routes: Routes = [
  { path: 'expenses', component: FinancesComponent },
  { path: 'categories', component: CategoryListComponent },

  { path: '', redirectTo: 'expenses', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
