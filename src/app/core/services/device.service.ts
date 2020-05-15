import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment'
import { Observable, pipe } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DeviceStats } from '../interfaces/device-stats';
import { ResourceState } from '../interfaces/resource-state';
import { map } from 'rxjs/operators';


const reqHeader = new HttpHeaders({});

const reqHeaderWithJson = new HttpHeaders({
  'content-type': 'application/json'
});

const rootUrl = environment.apis.thingerio.url;
const rootUrlDevice = rootUrl + '/v1/users/' +  environment.apis.thingerio.account + '/devices';
const rootUrlMeteoStation = rootUrlDevice + '/' + environment.devices.meteo;

@Injectable()
export class DeviceService {

  constructor(private readonly http: HttpClient) { }

  public listDevices() {
    return this.http.get(rootUrlDevice, { headers: reqHeader });
  }

  public getDeviceDetail(deviceId: string): Observable<DeviceStats> {
    const url = rootUrlDevice + '/' + deviceId + '/stats';
    return this.http.get<DeviceStats>(url, { headers: reqHeader });
  }

  public rebootDevice(deviceId: string): Observable<any> {
    const url = rootUrl + '/v2/users/' +  environment.apis.thingerio.account + '/devices/' + deviceId + '/reseting';
    return this.http.post(url, { in: true }, { headers: reqHeaderWithJson });
  }

  public switchResource(ressourceId: string, state: ResourceState, invert = false): Observable<any> {
    const url = rootUrlMeteoStation + '/' + ressourceId;
    const stateExpression = state !== ResourceState.ON;
    return this.http.post(url, { in: stateExpression }, { headers: reqHeaderWithJson });
  }

  public getResourceState(ressourceId: string): Observable<any> {
    const url = rootUrlMeteoStation + '/' + ressourceId + '-state';
    return this.http.get<any>(url, { headers: reqHeader }).pipe(
      map((res: any) => {
        return res.state ? res.state : ResourceState.OFF;
    }));
  }

}
