import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MeteoStats } from '../../interfaces/meteo-stats';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = '';

  constructor(private readonly http: HttpClient) {
    this.apiUrl =
      environment.api.url !== undefined ? environment.api.url : this.apiUrl;
  }

  public users(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/admin/users`);
  }
}
