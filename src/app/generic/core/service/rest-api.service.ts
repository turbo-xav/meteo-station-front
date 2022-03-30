import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  constructor(private http: HttpClient) {}

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  public delete(url: string): Observable<void> {
    return this.http.delete<void>(url);
  }

  public post<T>(url: string, obj: T): Observable<T> {
    return this.http.post<T>(url, obj);
  }

  public put<T>(url: string, obj: T): Observable<T> {
    return this.http.put<T>(url, obj);
  }

  private sendHttpRequest<T>(httpObservableRequest: Observable<T>) {
    return httpObservableRequest.pipe(
      tap(() => {
        console.log('Test');
      })
    );
  }
}
