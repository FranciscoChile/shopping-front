import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from './product';
import { catchError } from 'rxjs/operators';
import { CartItem } from 'src/app/selling/shared/cart-item';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl + "/product";
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  findById (id: string): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + "/" + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  findAll (): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/" + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  save(product: any): Observable<HttpEvent<any>> {

    const req = new HttpRequest('POST', this.apiUrl + "/save-multiple-images", product, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
    
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => error);
 }

}
