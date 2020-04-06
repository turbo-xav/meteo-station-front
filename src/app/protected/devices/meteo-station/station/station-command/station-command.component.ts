import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { DisplayService } from 'src/app/core/services/display.service';
import { DeviceService } from 'src/app/core/services/device.service';
import { ResourceState } from 'src/app/core/interfaces/resource-state';

@Component({
  selector: 'app-station-command',
  templateUrl: './station-command.component.html',
  styleUrls: ['./station-command.component.scss']
})
export class StationCommandComponent implements OnInit, OnDestroy {

  public unAvailableLed = true;


  public ledState = ResourceState.OFF;
  public screenState = ResourceState.OFF;
  public heaterState = ResourceState.OFF;


  private screenSubscription$: Subscription;
  private checkheaterSubscription$: Subscription;
  private ledSubscription$: Subscription;

  constructor(
    private readonly deviceService: DeviceService,
    private readonly displayService: DisplayService,
    private readonly spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.checkLed(true);
    /*this.ledSubscription$ = interval(2500).subscribe(
      () => { this.checkLed(false); }
    );
    this.checkScreen(true);
    this.screenSubscription$ = interval(2500).subscribe(
      () => { this.checkScreen(false); }
    );
    this.checkHeater(true);
    this.checkheaterSubscription$ = interval(2500).subscribe(
      () => { this.checkHeater(false); }
    );*/
  }

  public get ledisOn(): boolean {
    return this.ledState === ResourceState.ON;
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
          this.checkLed();
          this.unAvailableLed = false;
          this.spinner.hide();
        }
        ,
        (err: HttpErrorResponse) => {
          this.unAvailableLed = true;
          this.displayService.displayError('led.led-not-available');
          this.spinner.hide();
        }
      );
  }

  public get screenisOn(): boolean {
    return this.screenState === ResourceState.ON;
  }

  checkScreen(withSpinner = false) {

    if (withSpinner) {
      this.spinner.show();
    }

    this.deviceService.getResourceState('screen').pipe(
      timeout(3000)
    ).subscribe(
      (screenState: ResourceState) => {
        this.screenState = screenState;
        this.spinner.hide();
      },
      (err: HttpErrorResponse) => {
        this.displayService.displayError('screen.screen-not-available');
        this.spinner.hide();
      }
    );
  }

  public switchScreen() {
    this.spinner.show();
    this.deviceService.switchResource('screen', this.screenState).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.checkScreen();
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
      }
    );
  }

  public get heaterisOn(): boolean {
    return this.heaterState === ResourceState.ON;
  }

  public switchHeater() {
    this.spinner.show();

    this.deviceService.switchResource('heater', this.heaterState, true).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.checkHeater();
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
      }
    );
  }

  checkHeater(withSpinner = false) {

    if (withSpinner) {
      this.spinner.show();
    }

    this.deviceService.getResourceState('heater').pipe(
      timeout(3000)
    ).subscribe(
      (heaterState: ResourceState) => {
        this.heaterState = heaterState;
        this.spinner.hide();
      },
      (err: HttpErrorResponse) => {
        this.displayService.displayError('heater.heater-not-available');
        this.spinner.hide();
      }
    );
  }

  ngOnDestroy() {
    if (this.ledSubscription$) { this.ledSubscription$.unsubscribe(); }
    if (this.screenSubscription$) { this.screenSubscription$.unsubscribe(); }
    if (this.checkheaterSubscription$) { this.checkheaterSubscription$.unsubscribe(); }
  }

}
