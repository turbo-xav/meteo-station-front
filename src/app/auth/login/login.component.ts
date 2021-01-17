import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/generic/core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public loginInvalid = false;
  private returnUrl: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';

    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  login(): void {
    this.loginInvalid = false;
    if (this.form.valid) {
      try {
        if(this.form?.controls?.username && this.form?.controls?.password){
          const username = this.form.controls.username.value;
          const password = this.form.controls.password.value;
          this.authService.login(username, password);
        }
      } catch (err) {
        this.loginInvalid = true;
      }
    }
  }

}
