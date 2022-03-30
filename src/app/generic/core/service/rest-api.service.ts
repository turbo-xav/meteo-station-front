import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly spinnerService: SpinnerService
  ) {}

  public get<T>(url: string): Observable<T> {
    return this.sendHttpRequest(this.http.get<T>(url));
  }

  public delete(url: string): Observable<void> {
    return this.sendHttpRequest(this.http.delete<void>(url));
  }

  public post<T>(url: string, obj: T): Observable<T> {
    return this.sendHttpRequest(this.http.post<T>(url, obj));
  }

  public put<T>(url: string, obj: T): Observable<T> {
    return this.sendHttpRequest(this.http.put<T>(url, obj));
  }

  private sendHttpRequest<T>(
    httpObservableRequest: Observable<T>
  ): Observable<T> {
    this.spinnerService.open();
    return httpObservableRequest.pipe(
      tap({
        next: () => {
          this.spinnerService.close();
        },
        error: (httpErrorResponse: HttpErrorResponse): void => {
          this.spinnerService.close();
          console.error(httpErrorResponse);
        }
      })
    );
  }
}
