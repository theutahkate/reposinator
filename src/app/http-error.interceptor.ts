import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class HttpErrorInterceptor implements HttpInterceptor {
  public httpError = '';

  constructor(public errorService: ErrorService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          this.errorService.httpError.next(errorMessage);
          return throwError(errorMessage);
        })
      )
  }
}
