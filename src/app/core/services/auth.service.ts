import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { TokenDetail } from '../interfaces/token-detail';
import * as firebase from 'firebase';
import { from, of, Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';
import { EnvironmentDetail } from '../interfaces/environmentDetail';

const reqHeaderWithJson = new HttpHeaders({
  'Content-Type': 'application/x-www-form-urlencoded'
});

const rootUrl = environment.apis.thingerio.url;

@Injectable()
export class AuthService {

  helper: JwtHelperService;
  private itemName$ = 'currentUser';
  private app$: any;

  constructor(private readonly http: HttpClient, private readonly environmentService: EnvironmentService) {
    this.helper = new JwtHelperService();
    this.app$ = firebase.initializeApp(environment.firebaseConfig);
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
    firebase.auth().signOut();
    return this.signInFireBaseUser(username, password).pipe(
      switchMap(() => from(this.getFireBaseMeteoConfigInfos())),
      switchMap((querySnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
        let obs: Observable<any> = null;
        querySnapshot.forEach((doc) => {
          this.environmentService.setEnvironnent(doc.get('thingerio'), doc.get('forecast'));
          const usr = doc.get('thingerio.account.name');
          const pwd = doc.get('thingerio.account.password');
          // Firebase is not useful now we have all datas
          firebase.auth().signOut();
          obs = this.http.post<any>(
            `${rootUrl}/oauth/token`, `grant_type=password&username=${usr}&password=${pwd}`, { headers: reqHeaderWithJson })
            .pipe(tap((res: TokenDetail) => { localStorage.setItem(this.itemName$, res.access_token); }));
        });

        return obs;
      })
    );
  }

  logout() {
    localStorage.removeItem(this.itemName$);
    this.signOutFireBaseUser();
  }

  getFireBaseMeteoConfigInfos(): Observable<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> {
    return from(firebase.firestore(this.app$).collection('meteo-config').get());
  }

  signInFireBaseUser(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(firebase.auth().signInWithEmailAndPassword(email, password));
  }

  signOutFireBaseUser() {
    firebase.auth().signOut();
    this.environmentService.destroyEnv();
  }
}
