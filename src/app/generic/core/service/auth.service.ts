import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../interfaces/user';
import { UserDetail } from '../../interfaces/user-detail';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedBehaviorSubject = new BehaviorSubject<boolean>(false);

  constructor(private readonly http: HttpClient) {}

  get apiAuthUrl(): string {
    const apiUrl = environment.api?.url ?? 'http://localhost/api';
    return `${apiUrl}/auth`;
  }

  get apiAuthTokenTokenUrl(): string {
    return `${this.apiAuthUrl}/token/`;
  }

  get infos(): User | null {
    if (this.isAuthenticated()) {
      const helper = new JwtHelperService();
      const token = this.getToken();
      return helper.decodeToken(token ? token : '');
    }
    return null;
  }

  getIsAuthenticatedBehaviorSubject(): BehaviorSubject<boolean> {
    return this.isAuthenticatedBehaviorSubject;
  }

  login(code: string): void {
    this.http
      .get<UserDetail>(`${this.apiAuthTokenTokenUrl}?code=${code}`)
      .subscribe(
        (userDetail: UserDetail) => {
          if (userDetail.user && userDetail.user.token) {
            this.registerToken(userDetail.user.token);
            this.isAuthenticatedBehaviorSubject.next(true);
          }
        },
        () => {
          this.logOut();
        }
      );
  }

  logOut(): void {
    this.removeToken();
    this.isAuthenticatedBehaviorSubject.next(false);
  }

  isAuthenticated(): boolean {
    let isAuthenticated = false;
    const token = this.getToken();
    if (token !== null) {
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(token);
      if (!isExpired) {
        isAuthenticated = true;
      }
    }
    return isAuthenticated;
  }

  private registerToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  public getToken(): string {
    return sessionStorage.getItem('token') ?? '';
  }

  private removeToken(): void {
    sessionStorage.removeItem('token');
  }
}
