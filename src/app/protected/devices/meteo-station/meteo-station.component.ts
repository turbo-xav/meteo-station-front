import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval, combineLatest } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap, timeout } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Meteo } from 'src/app/core/interfaces/meteo';
import { Ephemeride } from 'src/app/core/interfaces/ephemeride';
import { Forecast } from 'src/app/core/interfaces/forecast';
import { MeteoService } from 'src/app/core/services/meteo.service';
import { environment } from '../../../../environments/environment';
import { ScreenService } from 'src/app/core/services/screen.service';
import { ScreenState } from 'src/app/core/interfaces/screen-state';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-meteo-station',
  templateUrl: './meteo-station.component.html',
  styleUrls: ['./meteo-station.component.scss']
})
export class MeteoStationComponent implements OnInit, OnDestroy {

  private meteoSubscription$: Subscription;

  public meteoEnable = false;

  public forecastAvailable = false;

  public screenState = ScreenState.OFF;

  private screenSubscription$: Subscription;

  meteo: Meteo;

  ephemeride: Ephemeride;
  forecast: Forecast;

  constructor(
    private readonly meteoService: MeteoService,
    private readonly screenService: ScreenService,
    private readonly spinner: NgxSpinnerService,
    private readonly toasterService: ToastrService,
    private readonly translateService: TranslateService) { }


  ngOnInit() {
    this.spinner.show();

    this.checkScreen(true);
    this.screenSubscription$ = interval(2500).subscribe(
      (val) => { this.checkScreen(false); }
    );
    this.meteoSubscription$ = interval(1000).subscribe(
      (val) => {
        this.refresh();
      },
      (err: HttpErrorResponse) => {
        this.meteoEnable = false;
      }
    );

    this.meteoService.getEphemeride().pipe(
      switchMap(
        (ephemeride: Ephemeride) => {
          this.ephemeride = ephemeride;
          return this.meteoService.getForecast();
        }
      )).subscribe(
        (forecast: Forecast) => {
          this.forecastAvailable = true;
          this.forecast = forecast;
          this.spinner.hide();
        },
        (err: HttpErrorResponse) => {
          this.forecastAvailable = false;
          this.spinner.hide();
        }
      );
  }

  public get screenisOn(): boolean {
    return this.screenState === ScreenState.ON;
  }

  public get meteoAvailable(): boolean {
    if (!(this.meteoEnable && this.meteo && this.meteo.temperature && this.meteo.pressure && this.meteo.humidity)) {
      return false;
    }
    return true;
  }

  public get city(): string {
    return environment.meteo.city;
  }

  public switchScreen() {
    const oldScreenState = this.screenState;
    const screenState: ScreenState = this.screenState === ScreenState.ON ? ScreenState.OFF : ScreenState.ON;
    this.screenState = null;
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

    if( withSpinner) {
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
          this.displayNotAvailableLed();
          this.spinner.hide();
        }
      );
  }

  refresh() {
    this.meteoService.refreshMeteo().subscribe(
      (meteo: any) => {
        this.meteo = meteo;
        this.meteoEnable = true;
      },
      () => {
        this.meteoEnable = false;
      });
  }

  displayNotAvailableLed() {
    this.translateService.get('screen.screen-not-available').subscribe(
      (translation: string) => {
        this.toasterService.error(translation);
      }
    );
  }

  ngOnDestroy() {
    if (this.meteoSubscription$) { this.meteoSubscription$.unsubscribe(); }
    if (this.screenSubscription$) { this.screenSubscription$.unsubscribe(); }
  }
}
