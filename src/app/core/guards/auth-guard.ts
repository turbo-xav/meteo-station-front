import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService, private readonly router: Router) {}
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      this.authService.lastUrl = state.url;
      
      if (!this.authService.isAuthenticated()) {
        this.router.navigateByUrl('/unauthenticated');      
        return false;
      } else {
        return true;
      }
    }
  }