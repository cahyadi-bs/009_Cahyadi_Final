import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Payment } from '../models/Payment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  

  //Endpoint untuk Lokal
  //endpoint:string = 'http://localhost:5000/api'
  //Endpoint Heroku
  endpoint:string = 'https://paymentapi-cbs.herokuapp.com/api'

  constructor(private http:HttpClient) { }

  getAll(): Observable<any> {
    const api = `${this.endpoint}/Payments`
    return this.http.get(api)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(payment:Payment): Observable<any> {
    const api = `${this.endpoint}/Payments`
    return this.http.post(api,payment)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  find(id:number): Observable<any> {
    const api = `${this.endpoint}/Payments/${id}`
    return this.http.get(api)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id: number, payment:Payment): Observable<any> {
    const api = `${this.endpoint}/Payments/${id}`
    return this.http.put(api, payment)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id:number){
    const api = `${this.endpoint}/Payments/${id}`
    return this.http.delete(api)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error : HttpErrorResponse) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    } 
    return throwError(errorMessage);
    }

}
