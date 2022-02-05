import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    req = req.clone({
      withCredentials: true,
      setHeaders: {
        'XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN'),
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });

    // returning an observable to complete the request cycle
    return new Observable((subscriber) => {
      next.handle(req).subscribe(
        (res: HttpEvent<unknown>): void => {
          if (res instanceof HttpResponse) {
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
