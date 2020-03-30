import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HeaterState } from '../interfaces/heater-state';

const reqHeader = new HttpHeaders({});

const reqHeaderWithJson = new HttpHeaders({
  'content-type': 'application/json'
});

const rootUrl = environment.apis.thingerio.url;
const rootUrlDevice = rootUrl + '/v2/users/' + environment.devices.account + '/devices/' + environment.devices.meteo;

@Injectable({
  providedIn: 'root'
})
export class HeaterService {

  constructor(private readonly http: HttpClient) { }

  public switchHeater(screenState: HeaterState): Observable<any> {
    console.log('Screen state : ', screenState);
    const url = rootUrlDevice + '/heater';
    return this.http.post(url, { in: !(screenState === HeaterState.ON) }, { headers: reqHeaderWithJson });
  }

  public checkHeater(): Observable<any> {
    const url = rootUrlDevice + '/heater-state';
    return this.http.get<any>(url, { headers: reqHeader });
  }

  public getHeaterState(): Observable<any> {

    return this.checkHeater().pipe(
      map((res: any) => {
        return res.out.state ? res.out.state : HeaterState.OFF;
      }));
  }
}

