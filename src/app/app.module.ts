import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

// 16.1. Install ng-bootstrap(component widget) and configure here
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';

// 12.1. define routes
const routes : Routes = [
  // 14.3. add new route for searching
  {path : 'search/:keyword', component: ProductListComponent},
  {path : 'category', component: ProductListComponent},
  {path : 'category/:id/:name', component: ProductListComponent},
  {path : 'products', component: ProductListComponent},
  {path : 'products/:id', component: ProductDetailsComponent},
  {path : 'cart-details', component: CartDetailsComponent},
  {path : 'checkout', component: CheckoutComponent},
  {path : '', redirectTo: '/products', pathMatch : 'full'},
  {path : '**', redirectTo: '/products', pathMatch : 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    // 12.2. configure router based on our routes
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
