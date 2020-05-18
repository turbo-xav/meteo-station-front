import { Forecast } from './../interfaces/forecast';
import { Ephemeride } from './../interfaces/ephemeride';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MeteoStats } from '../interfaces/meteo-stats';
import { MeteoData } from '../interfaces/meteo-data';
import { EnvironmentService } from './environment.service';
import { ForecastEnv } from '../interfaces/environment/forecast-env';

const reqHeader = new HttpHeaders({});

@Injectable()
export class MeteoService {

  private rootUrlDevice = '';
  private rootUrlBuckets = '';
  private rootUrlForecast = '';
  private rootUrlEndPoint = '';
  private insee: string;
  private city: string;
  private bucketH24: string;
  private bucketDaily: string;


  constructor(private readonly http: HttpClient, private readonly environmentService: EnvironmentService) {
    if (this.environmentService.isLoaded()) {

      const thingerIoAccount = this.environmentService.getEnvironnent().getThingerIo().account.name;
      const meteoDeviceName = this.environmentService.getEnvironnent().getThingerIo().device.name
      const rootUrl = this.environmentService.getEnvironnent().getThingerIo().url;

      this.rootUrlDevice = `${rootUrl}/v2/users/${thingerIoAccount}/devices/${meteoDeviceName}`;
      this.rootUrlBuckets = `${rootUrl}/v1/users/${thingerIoAccount}/buckets`;
      this.rootUrlForecast = this.environmentService.getEnvironnent().getForecast().url;
      this.rootUrlEndPoint = `${rootUrl}/v1/users/${thingerIoAccount}/endpoints`;

      this.insee = this.environmentService.getEnvironnent().getForecast().insee;
      this.city = this.environmentService.getEnvironnent().getForecast().city;
      this.insee = this.environmentService.getEnvironnent().getForecast().insee;
      this.bucketH24 = this.environmentService.getEnvironnent().getThingerIo().device.buckets.h24;
      this.bucketDaily = this.environmentService.getEnvironnent().getThingerIo().device.buckets.daily;


    }
  }

  public getCity(): string{
    return this.city;
  }

  public refreshMeteo(): Observable<MeteoData> {
    const url = `${this.rootUrlDevice}/meteo`;
    return this.http.get<MeteoData>(url, { headers: reqHeader }).pipe(
      map((res: any) => {
        return res.out;
      }),
      map((meteo: MeteoData) => {
        meteo.temperature = meteo.temperature ? Number(meteo.temperature.toFixed(2)) : null;
        meteo.pressure = meteo.pressure ? Number(meteo.pressure.toFixed(2)) : null;
        meteo.humidity = meteo.humidity ? Number(meteo.humidity.toFixed(2)) : null;
        return meteo;
      })
    );
  }

  public checkMeteo(): Observable<any> {
    const url = `${this.rootUrlDevice}/meteo`;
    return this.http.get<any>(url, { headers: reqHeader });
  }

  public getEphemeride(day = 0): Observable<Ephemeride> {

    const url = `${this.rootUrlForecast}/ephemeride/${day}?insee=${this.insee}`;
    return this.http.get<Ephemeride>(url, { headers: reqHeader }).pipe(
      map((datas: any) => datas.ephemeride
      )
    );
  }

  public getForecast(): Observable<Forecast> {
    const url = `${this.rootUrlForecast}/forecast/nextHours?insee=${this.insee}`;
    return this.http.get<Forecast>(url, { headers: reqHeader }).pipe(
      map((datas: any) => datas.forecast[0]),
      map((forecast: Forecast) => new Forecast(forecast.weather, forecast.temp2m, null, null, forecast.datetime))
    );
  }

  public getForecastDaily(): Observable<Forecast[]> {
    const url = `${this.rootUrlForecast}/forecast/daily?insee=${this.insee}`;
    return this.http.get<Forecast[]>(url, { headers: reqHeader }).pipe(
      map((datas: any) => datas.forecast),
      map((datas: Forecast[]) => {
        const forecasts: Forecast[] = [];
        for (const forecast of datas) {
          forecasts.push(new Forecast(forecast.weather, null, forecast.tmin, forecast.tmax, forecast.datetime));
        }
        return forecasts;
      }));
  }


  public getMeteoStatsH24(): Observable<MeteoStats[]> {
    return this.http.get<MeteoStats[]>(`${this.rootUrlBuckets}/${this.bucketH24}/data`, { headers: reqHeader });

  }

  public getMeteoStatsDaily(): Observable<MeteoStats[]> {
    if (!this.environmentService.getEnvironnent().getThingerIo()) { return null; }
    return this.http.get<MeteoStats[]>(`${this.rootUrlBuckets}/${this.bucketDaily}/data`, { headers: reqHeader });
  }

  public sendEndPoint(meteo: MeteoData): Observable<any> {
    return this.http.post<any>(`${this.rootUrlEndPoint}/meteo/call`, meteo, { headers: reqHeader });
  }
}
