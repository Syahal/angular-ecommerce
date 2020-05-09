import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';

// 12.1. define routes
const routes : Routes = [
  {path: 'category/:id/:name', component: ProductListComponent},
  {path : 'category', component: ProductListComponent},
  {path : 'products', component: ProductListComponent},
  {path : '', redirectTo: '/products', pathMatch : 'full'},
  {path : '**', redirectTo: '/products', pathMatch : 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent
  ],
  imports: [
    // 12.2. configure router based on our routes
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
