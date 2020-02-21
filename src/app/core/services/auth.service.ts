import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

const reqHeaderWithJson = new HttpHeaders({
  'Content-Type': 'application/x-www-form-urlencoded'
});

const rootUrl = environment.apis.thingerio.url;

export class AuthService {

 helper: JwtHelperService;

 constructor(private http: HttpClient) {
   this.helper = new JwtHelperService();
 }

 private theLastUrl: string;

 public set lastUrl(lastUrl: string) {
   this.theLastUrl = lastUrl;
 }

 public get lastUrl(): string{
  return this.theLastUrl ? this.theLastUrl : 'home';
 }

  isAuthenticated(): boolean {
    const rawToken: string = localStorage.getItem('currentUser')
    const decodedToken = this.helper.decodeToken(rawToken);

    if(!decodedToken){ return false; }

    return !this.helper.isTokenExpired(rawToken);
  }

  getToken(): string {
    return this.isAuthenticated ? localStorage.getItem('currentUser') : null;
  }

  login(username: string, password: string) {

    const subcription = this.http.post<any>(
      rootUrl + '/oauth/token', 'grant_type=password&username=' + username + '&password=' + password,
      {
        headers: reqHeaderWithJson
      }
    );

    subcription.subscribe(
      (res: any) => {
        localStorage.setItem('currentUser', res.access_token);
      }
    );
    return subcription;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
