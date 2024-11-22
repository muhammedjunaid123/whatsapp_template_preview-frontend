import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class httpInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService, private _toastr: ToastrService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    let newRequest = req
    newRequest = req.clone({
      url: environment.apiurl + req.url
    })
    return next.handle(newRequest).pipe(tap(

      (event: HttpEvent<any>) => {

        if (event instanceof HttpResponse) {
          this.spinner.hide();
        }
      }), catchError((error: HttpErrorResponse) => {
        this.spinner.hide();
        this._toastr.error(error.error.message, 'error')
        return throwError(() => error)
      })

    )

  }
};
