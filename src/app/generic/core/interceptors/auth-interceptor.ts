import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Prepare headers with JWT Authorization Bearer Token
    const headerWithAuthorizationBearer = {
      Authorization: `Bearer ${this.authService.getToken()}`
    };

    // Prepare headers with 'XSRF-TOKEN' if available
    const headerWithjXSRFToken = {
      'XSRF-TOKEN': sessionStorage.getItem('XSRF-TOKEN') as string
    };

    const setHeaders =
      sessionStorage.getItem('XSRF-TOKEN') !== null
        ? { ...headerWithjXSRFToken, ...headerWithAuthorizationBearer }
        : headerWithAuthorizationBearer;

    // Allow Credential into request (cookies, ...)
    req = req.clone({
      withCredentials: true,
      setHeaders
    });

    // Returning an observable to complete the request cycle
    return new Observable((subscriber) => {
      next.handle(req).subscribe(
        (res: HttpEvent<unknown>): void => {
          if (res instanceof HttpResponse) {
            // Detect xsrf-token return by Back-End & store XSRF-TOKEN into sessionStorage
            if (
              res.headers.has('xsrf-token') &&
              res.headers.get('xsrf-token') !== null
            ) {
              const token = res.headers.get('xsrf-token') as string;
              sessionStorage.setItem('XSRF-TOKEN', token);
            }
            // Send request
            subscriber.next(res);
          }
        },
        (err: HttpErrorResponse): void => {
          // Log out & redirect to login page
          if (err.status === 401) {
            this.authService.logOut();
            void this.router.navigate(['/auth']);
          }

          // Redirect to unauthorized page information
          if (err.status === 403) {
            void this.router.navigate(['/auth/unauthorized']);
          }
          // Send Error
          subscriber.error(err);
        }
      );
    });
  }
}
