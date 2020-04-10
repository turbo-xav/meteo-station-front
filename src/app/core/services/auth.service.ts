import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { TokenDetail } from '../interfaces/token-detail';
import { SharedModule } from 'src/app/shared/shared.module';

const reqHeaderWithJson = new HttpHeaders({
  'Content-Type': 'application/x-www-form-urlencoded'
});

const rootUrl = environment.apis.thingerio.url;

@Injectable()
export class AuthService {

  helper: JwtHelperService;
  private itemName$ = 'currentUser';

  constructor(private http: HttpClient) {
    this.helper = new JwtHelperService();
  }

  private theLastUrl: string;

  public set lastUrl(lastUrl: string) {
    this.theLastUrl = lastUrl;
  }

  public get lastUrl(): string {
    return this.theLastUrl ? this.theLastUrl : 'home';
  }

  isAuthenticated(): boolean {
    const rawToken: string = localStorage.getItem(this.itemName$);
    return this.helper.decodeToken(rawToken) && !this.helper.isTokenExpired(rawToken);
  }

  getToken(): string {
    return this.isAuthenticated ? localStorage.getItem(this.itemName$) : null;
  }

  login(username: string, password: string) {

    return this.http.post<any>(
      rootUrl + '/oauth/token', 'grant_type=password&username=' + username + '&password=' + password, { headers: reqHeaderWithJson })
      .pipe( tap((res: TokenDetail) => { localStorage.setItem(this.itemName$, res.access_token); } ));
  }

  logout() {
    localStorage.removeItem(this.itemName$);
  }
}
