import {
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
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });

    // returning an observable to complete the request cycle
    return new Observable((subscriber) => {
      next.handle(req).subscribe(
        (res: HttpEvent<unknown>) => {
          if (res instanceof HttpResponse) {
            subscriber.next(res);
          }
        },
        () => {
          this.authService.logOut();
        }
      );
    });
  }
}
