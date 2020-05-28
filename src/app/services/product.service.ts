import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) {}

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  // get product details
  getProduct(theProductId: number): Observable<Product> {
    // build url based on productId
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  // get product list by category 
  getProductList(theCategoryId: number): Observable<Product[]> {
    // 12.7. call new URL/method on spring based categoryId
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  // method for search by keyword
  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  // 13.4. Enhance menu component (product category menu) to read data from service
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategories>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  // get product by page
  // 16.3. add pagination method to support pagination
  getProductListPaginate(
    thePage: number,
    thePageSize: number,
    theCategoryId: number
  ): Observable<GetResponseProducts> {
    // need to build URL based on category id, page and size
    const searchUrl =
      `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` +
      `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  // get product by page with search by name
  searchProductListPaginate(
    thePage: number,
    thePageSize: number,
    theKeyword: string
  ): Observable<GetResponseProducts> {
    // need to build URL based on keyword, page and size
    const searchUrl =
      `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}` +
      `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  // 16.2. Refactor this interface and add pagination support to product service
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

// 13.5. add this interface to call URL on Spring
interface GetResponseProductCategories {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
