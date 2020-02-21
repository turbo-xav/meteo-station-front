import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ContentRef } from 'ngx-bootstrap';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {


  registrationForm: FormGroup;

  initialCounter: number = 0;
  counter: number = 0;
  private _counterSubscription: Subscription;

  loginStep: boolean = false;




  constructor(private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly translateService: TranslateService,
    private readonly toasterService: ToastrService) {

    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],

    });
  }

  ngOnInit() {
    this.initialCounter = Date.now();
    if (this.authService.isAuthenticated()) {
      this._counterSubscription = interval(500).subscribe(() => {
        const counter = 3 - Math.floor((Date.now() - this.initialCounter) / 1000);
        this.counter = counter >= 0 ? counter : 0;
        if (counter < 0) {
          this._counterSubscription.unsubscribe();
          this.router.navigateByUrl('/home');
        }
      })
    }
  }

  ngOnDestroy(): void {
    if (this._counterSubscription) { this._counterSubscription.unsubscribe(); }
  }


  public get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  public get username(): string {
    return this.registrationForm.get('username').value;
  }

  public get password(): string {
    return this.registrationForm.get('password').value;
  }

  login() {
    this.loginStep = true;
    this.authService.login(this.username, this.password).subscribe(
      () => {        
        const urlRedirect = this.authService.lastUrl ? this.authService.lastUrl : 'home';
        setTimeout(() => {
        this.router.navigate([urlRedirect]);
        }, 500);
      },
      (err: HttpErrorResponse) => {
        this.loginStep = false;
        if (err.status == 401) {
          this.translateService.get('auth.bad-credentials').subscribe(
            (translation: string) => {
              this.toasterService.error(translation);
            }
          );
        }
      }
    );
  }


}
