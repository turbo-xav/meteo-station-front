import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
/*import { CookieService } from 'ngx-cookie-service';*/
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService /*,
    private readonly cookieService: CookieService*/
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.warn(sessionStorage.getItem('XSRF-TOKEN') as string);

    req = req.clone({
      withCredentials: true,
      setHeaders: {
        //'XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN'),
        'XSRF-TOKEN': sessionStorage.getItem('XSRF-TOKEN') as string,
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });

    // returning an observable to complete the request cycle
    return new Observable((subscriber) => {
      next.handle(req).subscribe(
        (res: HttpEvent<unknown>): void => {
          if (res instanceof HttpResponse) {
            if (res.headers.has('xsrf-token')) {
              console.warn(req.url, ' : ', res.headers.get('xsrf-token'));

              const token = res.headers.get('xsrf-token') as string;
              sessionStorage.setItem('XSRF-TOKEN', token);
            }
            subscriber.next(res);
          }
        },
        (err: HttpErrorResponse): void => {
          if (err.status === 401) {
            this.authService.logOut();
          }
        }
      );
    });
  }
}
