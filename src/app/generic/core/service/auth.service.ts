import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _authenticated = false;

  constructor(
    private readonly router: Router,
  ) { }

  login(username: string, password: string) {
    this._authenticated = true;
    this.router.navigate(['/home']);
  }

  logOut() {
    this._authenticated = false;
    this.router.navigate(['/auth']);
  }

  isAuthenticated(): boolean {
    console.warn(this._authenticated);
    return this._authenticated;
  }
}
