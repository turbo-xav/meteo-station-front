import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authenticated = false;

  constructor(
    private readonly router: Router,
  ) { }

  login(username: string, password: string): void {
    this._authenticated = true;
    this.router.navigate(['/home']);
  }

  logOut(): void {
    this._authenticated = false;
    this.router.navigate(['/auth']);
  }

  isAuthenticated(): boolean {
    return this._authenticated;
  }
}
