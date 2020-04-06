import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { timeout, switchMap } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeviceStats } from 'src/app/core/interfaces/device-stats';
import { DisplayService } from 'src/app/core/services/display.service';
import { ResourceState } from 'src/app/core/interfaces/resource-state';
import { DeviceService } from 'src/app/core/services/device.service';

@Component({
  selector: 'app-play-led',
  templateUrl: './play-led.component.html',
  styleUrls: ['./play-led.component.scss']
})
export class PlayLedComponent implements OnInit, OnDestroy {

  unAvailableLed = true;

  isCollapsed = true;

  ledStats: DeviceStats;

  ledState: ResourceState;

  private ledSubscription$: Subscription;


  constructor(
    private readonly deviceService: DeviceService,
    private readonly displayService: DisplayService,
    private readonly spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.checkLed(true);
    this.ledSubscription$ = interval(2500).subscribe(
      () => { this.checkLed(false); }
    );
  }

  ngOnDestroy() {
    if (this.ledSubscription$) { this.ledSubscription$.unsubscribe(); }
  }

  checkLed(withSpinner = false) {

    if (withSpinner) {
      this.spinner.show();
    }

    this.deviceService.getResourceState('led').pipe(
      timeout(3000)
    ).subscribe(
      (ledState: ResourceState) => {
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

    this.spinner.show();

    this.deviceService.switchResource('led', this.ledState)
      .pipe(timeout(3000))
      .subscribe(
        () => {
          this.unAvailableLed = false;
          this.spinner.hide();
          this.checkLed();
        }
        ,
        (err: HttpErrorResponse) => {
          this.unAvailableLed = true;
          this.displayService.displayError('led.led-not-available');
          this.spinner.hide();
          this.checkLed();
        }
      );
  }
}
