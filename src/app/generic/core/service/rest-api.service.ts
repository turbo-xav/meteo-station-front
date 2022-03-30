import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';

interface HttpConfCall {
  withSpinner: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly spinnerService: SpinnerService
  ) {}

  public get<T>(url: string, httpConfCall?: HttpConfCall): Observable<T> {
    return this.sendHttpRequest(this.http.get<T>(url), httpConfCall);
  }

  public delete(url: string, httpConfCall?: HttpConfCall): Observable<void> {
    return this.sendHttpRequest(this.http.delete<void>(url), httpConfCall);
  }

  public post<T>(
    url: string,
    obj: T,
    httpConfCall?: HttpConfCall
  ): Observable<T> {
    return this.sendHttpRequest(this.http.post<T>(url, obj), httpConfCall);
  }

  public put<T>(
    url: string,
    obj: T,
    httpConfCall?: HttpConfCall
  ): Observable<T> {
    return this.sendHttpRequest(this.http.put<T>(url, obj), httpConfCall);
  }

  private sendHttpRequest<T>(
    httpObservableRequest: Observable<T>,
    httpConfCall: HttpConfCall = { withSpinner: true }
  ): Observable<T> {
    if (httpConfCall.withSpinner) {
      this.spinnerService.open();
    }
    return httpObservableRequest.pipe(
      tap({
        next: () => {
          this.spinnerService.close();
          console.error('ok');
        },
        error: (httpErrorResponse: HttpErrorResponse): void => {
          this.spinnerService.close();
          console.error(httpErrorResponse);
        }
      })
    );
  }
}
