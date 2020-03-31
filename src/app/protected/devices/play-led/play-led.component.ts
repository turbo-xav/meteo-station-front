import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { timeout, switchMap } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeviceStats } from 'src/app/core/interfaces/device-stats';
import { LedState } from 'src/app/core/interfaces/led-state';
import { LedService } from 'src/app/core/services/led.service';
import { DisplayService } from 'src/app/core/services/display.service';

@Component({
  selector: 'app-play-led',
  templateUrl: './play-led.component.html',
  styleUrls: ['./play-led.component.scss']
})
export class PlayLedComponent implements OnInit, OnDestroy {

  unAvailableLed = true;

  isCollapsed = true;

  ledStats: DeviceStats;

  ledState: LedState;

  private ledSubscription$: Subscription;


  constructor(
    private readonly ledService: LedService,
    private readonly displayService: DisplayService,
    private readonly spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.checkLed(true);
    this.ledSubscription$ = interval(2500).subscribe(
      (val) => { this.checkLed(false); }
    );
  }

  ngOnDestroy() {
    if (this.ledSubscription$) { this.ledSubscription$.unsubscribe(); }
  }

  checkLed(withSpinner = false) {

    if (withSpinner) {
      this.spinner.show();
    }

    this.ledService.getLedState().pipe(
      timeout(3000)
    ).subscribe(
      (ledState: LedState) => {
        this.ledState = ledState;
        this.unAvailableLed = false;
        this.spinner.hide();
      },
      (err: HttpErrorResponse) => {
        this.unAvailableLed = true;
        this.displayService.displayError('led.led-not-available');
        this.spinner.hide();
      }
    );
  }

  toggleLed() {
    const oldLedState = this.ledState;
    const ledState: LedState = this.ledState === LedState.ON ? LedState.OFF : LedState.ON;
    this.spinner.show();

    this.ledService.toggleLed(ledState)
      .pipe(timeout(3000))
      .subscribe(
        () => {
          this.unAvailableLed = false;
          this.ledState = ledState;
          this.spinner.hide();
        }
        ,
        (err: HttpErrorResponse) => {
          this.unAvailableLed = true;
          this.ledState = oldLedState;
          this.displayService.displayError('led.led-not-available');
          this.spinner.hide();
        }
      );
  }
}
