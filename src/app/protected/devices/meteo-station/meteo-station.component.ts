import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { MeteoData } from 'src/app/core/interfaces/meteo-data';
import { Ephemeride } from 'src/app/core/interfaces/ephemeride';
import { Forecast } from 'src/app/core/interfaces/forecast';
import { MeteoService } from 'src/app/core/services/meteo.service';
import { DisplayService } from 'src/app/core/services/display.service';


@Component({
  selector: 'app-meteo-station',
  templateUrl: './meteo-station.component.html',
  styleUrls: ['./meteo-station.component.scss']
})
export class MeteoStationComponent implements OnInit, OnDestroy {

  private meteoSubscription$: Subscription;

  public meteoEnable = false;

  public forecastAvailable = false;


  meteo: MeteoData;

  ephemeride: Ephemeride;
  forecast: Forecast;

  constructor(
    private readonly meteoService: MeteoService,
    private readonly displayService: DisplayService,
    private readonly spinner: NgxSpinnerService) { }


  ngOnInit() {
    this.spinner.show();

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

  public get meteoAvailable(): boolean {
    if (!(this.meteoEnable && this.meteo && this.meteo.temperature && this.meteo.pressure && this.meteo.humidity)) {
      return false;
    }
    return true;
  }

  public get city(): string {
    return this.meteoService.getCity();
  }

  public send() {
    this.spinner.show();
    this.meteoService.refreshMeteo().pipe(
      switchMap(
        (meteo: MeteoData) => {
          return this.meteoService.sendEndPoint(meteo)
        }
      )
    ).subscribe(
      () => {
        this.displayService.displaySuccess('meteo-station.send-ok');
        this.spinner.hide();
      },
      (err: HttpErrorResponse) => {
        this.displayService.displayError('meteo-station.send-ko');
        this.spinner.hide();
      });
  }

  ngOnDestroy() {
    if (this.meteoSubscription$) { this.meteoSubscription$.unsubscribe(); }
  }

}
