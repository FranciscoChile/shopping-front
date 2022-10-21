import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from './customer';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = environment.apiUrl + "/customer";
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  findAll (): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  findById (id: string): Observable<Customer> {
    return this.http.get<Customer>(this.apiUrl + "/" + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  save(customer: any): Observable<HttpEvent<any>> {

    const req = new HttpRequest('POST', this.apiUrl + "/save-profile-image", customer, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
    
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + "/" + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  createCustomerMultipleImages (customer: any): Observable<any> {
    return this.http.post(this.apiUrl + "/customer-multiple-images", customer)
    .pipe(
      catchError(this.errorHandler)
    );
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
