import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DeviceService } from './device.service';
import { tap, map } from 'rxjs/operators';
import { LedState } from '../interfaces/led-state';

const reqHeader = new HttpHeaders({});

const reqHeaderWithJson = new HttpHeaders({
  'content-type': 'application/json'
});

const rootUrl = environment.apis.thingerio.url + '/v2/users/turboxav/devices/' + environment.devices.meteo;

export class LedService {

  constructor(
    private readonly http: HttpClient,
    private readonly deviceService: DeviceService) { }

  public getStats() {
    return this.deviceService.getDeviceDetail(environment.devices.meteo);
  }

  public toggleLed(ledState: LedState): Observable<any> {

    const url = rootUrl + '/led';
    return this.http.post(url, { in: ledState === LedState.ON }, { headers: reqHeaderWithJson });
  }

  public getLedState(): Observable<any> {
    return this.checkLed().pipe(
      map((res: any) => {
        return res.out.state ? res.out.state : LedState.OFF;
      }));
  }

  public checkLed(): Observable<any> {
    const url = rootUrl + '/led-state';
    return this.http.get<any>(url, { headers: reqHeader });
  }
}
