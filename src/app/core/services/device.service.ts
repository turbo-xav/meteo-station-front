import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DeviceStats } from '../interfaces/device-stats';


const reqHeader = new HttpHeaders({});

const reqHeaderWithJson = new HttpHeaders({
  'content-type': 'application/json'
});

const rootUrl = environment.apis.thingerio.url;
const rootUrlDevice = rootUrl + '/v1/users/' + environment.devices.account + '/devices';

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
    const url = rootUrl + '/v2/users/' + environment.devices.account + '/devices/' + deviceId + '/reseting';
    return this.http.post(url, { in: true }, { headers: reqHeaderWithJson });
  }



}
