import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-unauthenticated',
  templateUrl: './unauthenticated.component.html',
  styleUrls: ['./unauthenticated.component.scss']
})
export class UnauthenticatedComponent implements OnInit, OnDestroy {


  constructor(private readonly router: Router, private readonly authService: AuthService, ) { }

  initialCounter: number = 0;
  counter: number = 0;
  private _counterSubscription: Subscription;

  ngOnInit() {
    this.initialCounter = Date.now();
    if (!this.authService.isAuthenticated()) {
      this._counterSubscription = interval(500).subscribe(() => {
        const counter = 3 - Math.floor((Date.now() - this.initialCounter) / 1000);
        this.counter = counter >= 0 ? counter : 0;
        if (counter < 0) {
          this._counterSubscription.unsubscribe();
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 500);
        }
      })
    }
  }

  ngOnDestroy(): void {
    if (this._counterSubscription) { this._counterSubscription.unsubscribe(); }
  }


}
