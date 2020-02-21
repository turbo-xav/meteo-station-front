import { Forecast } from './../interfaces/forecast';
import { Ephemeride } from './../interfaces/ephemeride';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Meteo } from '../interfaces/meteo';

const reqHeader = new HttpHeaders({});

const rootUrl = environment.apis.thingerio.url + '/v2/users/turboxav/devices/' + environment.devices.meteo;
const rootUrlForecast = environment.apis.forecast.url;

export class MeteoService {

  constructor(private readonly http: HttpClient) { }



  public refreshMeteo(): Observable<Meteo> {
    const url = rootUrl + '/meteo';
    return this.http.get<Meteo>(url, { headers: reqHeader }).pipe(
      map( (res: any) => {
        return res.out;
      }),
      map((meteo: Meteo) => {
        meteo.temperature = meteo.temperature ? Number(meteo.temperature.toFixed(2)) : null;
        meteo.pressure = meteo.pressure ? Number(meteo.pressure.toFixed(2)) : null;
        meteo.humidity = meteo.humidity ? Number(meteo.humidity.toFixed(2)) : null;
        return meteo;
      })
    );
  }

  public checkMeteo(): Observable<any> {
    const url = rootUrl + '/meteo';
    return this.http.get<any>(url, { headers: reqHeader });
  }

  public getEphemeride(): Observable<Ephemeride> {
    const url = rootUrlForecast + '/ephemeride/0?insee=' + environment.meteo.insee;
    return this.http.get<Ephemeride>(url, { headers: reqHeader }).pipe(
      map((datas: any) => datas.ephemeride
      )
    );
  }

  public getForecast(): Observable<Forecast> {
    const url = rootUrlForecast + '/forecast/nextHours?insee=' + environment.meteo.insee;
    return this.http.get<Forecast>(url, { headers: reqHeader }).pipe(
      map((datas: any) => datas.forecast[0]),
      map((forecast: Forecast) => new Forecast(forecast.weather, forecast.temp2m, forecast.datetime))
    );
  }
}
