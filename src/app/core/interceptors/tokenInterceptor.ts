import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DisplayService } from '../services/display.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    // We inject a LoginService
    constructor(
        private readonly authService: AuthService,
        private readonly displayService: DisplayService,
        private readonly router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add authorization header with basic auth credentials if available
        if (this.authService.isAuthenticated()) {
            const currentUser = this.authService.getToken();
            if (currentUser) {
                if (this.isThingerIo(request.url)) {
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${currentUser}`
                        }
                    });
                } else if (this.isForecastUrl(request.url)) {
                    request = request.clone({
                        setParams: {
                            token: environment.apis.forecast.token
                        }
                    });
                }
            }
        }

        return next.handle(request).pipe(
            map((http: HttpEvent<any>) => {
                if (http instanceof HttpErrorResponse) {


                }
                return http;
            }),
            catchError((httpError: HttpErrorResponse) => {
                this.displayService.displayError('error.http-error', 'Status : ' + httpError.status);
                switch (httpError.status) {
                    case 401:
                        this.router.navigate(['/unauthenticated']);
                        break;
                }
                return throwError(httpError);
            }));
    }

    private isForecastUrl(url: string | string[]): boolean {
        return url.includes(environment.apis.forecast.url)
    }

    private isThingerIo(url: string | string[]): boolean {
        return url.includes(environment.apis.thingerio.url)
    }
}