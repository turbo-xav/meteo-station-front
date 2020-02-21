import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export class ExampleInterceptor implements HttpInterceptor {

    // We inject a LoginService
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log('Example inteceptors', request.url);
        console.log();
        return next.handle(request).pipe(
            catchError((error) => {
                return throwError(error);
            }));
    }
}