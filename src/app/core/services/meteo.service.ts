import { Forecast } from './../interfaces/forecast';
import { Ephemeride } from './../interfaces/ephemeride';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MeteoStats } from '../interfaces/meteo-stats';
import { MeteoData } from '../interfaces/meteo-data';

const reqHeader = new HttpHeaders({});

const rootUrl = environment.apis.thingerio.url
const rootUrlDevice = rootUrl + '/v2/users/' +  environment.apis.thingerio.account + '/devices/' + environment.devices.meteo;
const rootUrlBuckets = rootUrl + '/v1/users/' +  environment.apis.thingerio.account + '/buckets';
const rootUrlForecast = environment.apis.forecast.url;
const rootUrlEndPoint = rootUrl+'/v1/users/'+  environment.apis.thingerio.account+'/endpoints';
@Injectable()
export class MeteoService {

  constructor(private readonly http: HttpClient) { }

  public refreshMeteo(): Observable<MeteoData> {
    const url = rootUrlDevice + '/meteo';
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
    const url = rootUrlDevice + '/meteo';
    return this.http.get<any>(url, { headers: reqHeader });
  }

  public getEphemeride(day = 0): Observable<Ephemeride> {
    const url = rootUrlForecast + '/ephemeride/' + day + '?insee=' + environment.meteo.insee;
    return this.http.get<Ephemeride>(url, { headers: reqHeader }).pipe(
      map((datas: any) => datas.ephemeride
      )
    );
  }

  public getForecast(): Observable<Forecast> {
    const url = rootUrlForecast + '/forecast/nextHours?insee=' + environment.meteo.insee;
    return this.http.get<Forecast>(url, { headers: reqHeader }).pipe(
      map((datas: any) => datas.forecast[0]),
      map((forecast: Forecast) => new Forecast(forecast.weather, forecast.temp2m, null, null, forecast.datetime))
    );
  }

  public getForecastDaily(): Observable<Forecast[]> {
    const url = rootUrlForecast + '/forecast/daily?insee=' + environment.meteo.insee;
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
    return this.http.get<MeteoStats[]>(rootUrlBuckets + '/' + environment.devices.buckets.h24 + '/data', { headers: reqHeader });

  }

  public getMeteoStatsDaily(): Observable<MeteoStats[]> {
    return this.http.get<MeteoStats[]>(rootUrlBuckets + '/' + environment.devices.buckets.daily + '/data', { headers: reqHeader });
  }

  public sendEndPoint(meteo: MeteoData): Observable<any>{
    return this.http.post<any>(rootUrlEndPoint + '/meteo/call', meteo, { headers: reqHeader });
  }
}
