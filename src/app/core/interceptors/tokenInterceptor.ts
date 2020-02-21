import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export class TokenInterceptor implements HttpInterceptor {

    // We inject a LoginService
    constructor(private authService: AuthService) { }

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
                        }});
                }
            }
        }

        return next.handle(request).pipe(
            catchError((error) => {
                return throwError(error);
            }));
    }

    private isForecastUrl(url): boolean {
        return url.includes(environment.apis.forecast.url)
    }

    private isThingerIo(url): boolean {
        return url.includes(environment.apis.thingerio.url)
    }
}