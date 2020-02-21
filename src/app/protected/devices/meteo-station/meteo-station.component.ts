import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval, combineLatest } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Meteo } from 'src/app/core/interfaces/meteo';
import { Ephemeride } from 'src/app/core/interfaces/ephemeride';
import { Forecast } from 'src/app/core/interfaces/forecast';
import { MeteoService } from 'src/app/core/services/meteo.service';
import { environment } from '../../../../environments/environment';



@Component({
  selector: 'app-meteo-station',
  templateUrl: './meteo-station.component.html',
  styleUrls: ['./meteo-station.component.scss']
})
export class MeteoStationComponent implements OnInit, OnDestroy {

  private meteoSubscription$: Subscription;

  private meteoEnable = false;

  public forecastAvailable = false;


  meteo: Meteo;

  ephemeride: Ephemeride;
  forecast: Forecast;

  constructor(
    private readonly meteoService: MeteoService ,
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


  public get meteoAvailable(): boolean {
    if (!(this.meteoEnable && this.meteo && this.meteo.temperature && this.meteo.pressure && this.meteo.humidity)) {
      return false;
    }
    return true;
  }

  public get city(): string {
    return environment.meteo.city;
  }

  public get temperature() {
    return this.meteo && this.meteo.temperature ? this.meteo.temperature.toFixed(2) : null;
  }

  public get pressure() {
    return this.meteo && this.meteo.pressure ? this.meteo.pressure.toFixed(1) : null;
  }

  public get humidity() {
    return this.meteo && this.meteo.humidity ? this.meteo.humidity.toFixed(1) : null;
  }

  refresh() {
    this.meteoService.refreshMeteo().subscribe(
      (meteo: any) => {
        this.meteo = meteo.out;
        this.meteoEnable = true;
      },
      () => {
        this.meteoEnable = false;
      });
  }

  ngOnDestroy() {
    if (this.meteoSubscription$) { this.meteoSubscription$.unsubscribe(); }
  }

}
