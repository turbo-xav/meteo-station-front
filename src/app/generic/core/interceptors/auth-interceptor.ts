import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const headerWithAuthorizationBearer = {
      Authorization: `Bearer ${this.authService.getToken()}`
    };

    const headerWithjXSRFToken = {
      'XSRF-TOKEN': sessionStorage.getItem('XSRF-TOKEN') as string
    };

    const setHeaders =
      sessionStorage.getItem('XSRF-TOKEN') !== null
        ? { ...headerWithjXSRFToken, ...headerWithAuthorizationBearer }
        : headerWithAuthorizationBearer;

    req = req.clone({
      withCredentials: true,
      setHeaders
    });

    // returning an observable to complete the request cycle
    return new Observable((subscriber) => {
      next.handle(req).subscribe(
        (res: HttpEvent<unknown>): void => {
          if (res instanceof HttpResponse) {
            //console.warn(req.url, ' : ', res.headers.get('xsrf-token'));
            if (
              res.headers.has('xsrf-token') &&
              res.headers.get('xsrf-token') !== null
            ) {
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
