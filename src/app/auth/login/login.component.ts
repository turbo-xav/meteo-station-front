import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/generic/core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginInvalid = false;
  private returnUrl: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }

    this.authService
      .getIsAuthenticatedBehaviorSubject()
      .subscribe((isAuthenticated: boolean) => {
        console.log(isAuthenticated);
        if (isAuthenticated) {
          this.router.navigate([this.returnUrl]);
        }
      });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('code')) {
        const code = paramMap.get('code');
        if (code !== null) {
          this.authService.login(code);
        }
      }
    });
  }

  get authUrl(): string {
    return this.authService.apiAuthUrl;
  }
}
