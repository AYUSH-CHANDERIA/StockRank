import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './stock/home/home.component';
import { StockDetailsComponent } from './stock/stock-details/stock-details.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'stock/:id', component: StockDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
