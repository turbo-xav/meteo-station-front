import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScreenService } from 'src/app/core/services/screen.service';
import { HeaterService } from 'src/app/core/services/heater.service';
import { TranslateService } from '@ngx-translate/core';
import { ScreenState } from 'src/app/core/interfaces/screen-state';
import { HeaterState } from 'src/app/core/interfaces/heater-state';
import { Subscription, interval } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-station-command',
  templateUrl: './station-command.component.html',
  styleUrls: ['./station-command.component.scss']
})
export class StationCommandComponent implements OnInit, OnDestroy {

  public screenState = ScreenState.OFF;

  public heaterState = HeaterState.OFF;

  private screenSubscription$: Subscription;
  private checkheaterSubscription$: Subscription;


  constructor(
    private readonly screenService: ScreenService,
    private readonly heaterService: HeaterService,
    private readonly translateService: TranslateService,
    private readonly toasterService: ToastrService,
    private readonly spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.checkScreen(true);
    this.screenSubscription$ = interval(2500).subscribe(
      (val) => { this.checkScreen(false); }
    );
    this.checkHeater(true);
    this.checkheaterSubscription$ = interval(2500).subscribe(
      (val) => { this.checkHeater(false); }
    );
  }

  public get screenisOn(): boolean {
    return this.screenState === ScreenState.ON;
  }

  public switchScreen() {
    const oldScreenState = this.screenState;
    const screenState: ScreenState = this.screenState === ScreenState.ON ? ScreenState.OFF : ScreenState.ON;
    this.spinner.show();
    this.screenService.switchScreen(screenState).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.screenState = screenState;
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.screenState = oldScreenState;
      }
    );
  }

  checkScreen(withSpinner = false) {

    if (withSpinner) {
      this.spinner.show();
    }

    this.screenService.getScreenState().pipe(
      timeout(3000)
    ).subscribe(
      (screenState: ScreenState) => {
        this.screenState = screenState;
        this.spinner.hide();
      },
      (err: HttpErrorResponse) => {
        this.displayNotAvailableScreen();
        this.spinner.hide();
      }
    );
  }

  public get heaterisOn(): boolean {
    return this.heaterState === HeaterState.ON;
  }

  public switchHeater() {
    const oldHeaterState = this.heaterState;
    const heaterState: HeaterState = this.heaterState === HeaterState.ON ? HeaterState.OFF : HeaterState.ON;
    this.spinner.show();
    this.heaterService.switchHeater(heaterState).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.heaterState = heaterState;
      },
      (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.heaterState = oldHeaterState;
      }
    );
  }

  checkHeater(withSpinner = false) {

    if (withSpinner) {
      this.spinner.show();
    }

    this.heaterService.getHeaterState().pipe(
      timeout(3000)
    ).subscribe(
      (heaterState: HeaterState) => {
        this.heaterState = heaterState;
        this.spinner.hide();
      },
      (err: HttpErrorResponse) => {
        this.displayNotAvailableHeater();
        this.spinner.hide();
      }
    );
  }



  displayNotAvailableScreen() {
    this.translateService.get('screen.screen-not-available').subscribe(
      (translation: string) => {
        this.toasterService.error(translation);
      }
    );
  }

  displayNotAvailableHeater() {
    this.translateService.get('heater.heater-not-available').subscribe(
      (translation: string) => {
        this.toasterService.error(translation);
      }
    );
  }

  ngOnDestroy() {
    if (this.screenSubscription$) { this.screenSubscription$.unsubscribe(); }
    if (this.checkheaterSubscription$) { this.checkheaterSubscription$.unsubscribe(); }
  }

}
