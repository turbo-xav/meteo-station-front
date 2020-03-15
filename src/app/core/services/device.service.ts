import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DeviceStats } from '../interfaces/device-stats';


const reqHeader = new HttpHeaders({});

const reqHeaderWithJson = new HttpHeaders({
  'content-type': 'application/json'
});

const rootUrl = environment.apis.thingerio.url + '/v1/users/turboxav';

export class DeviceService {

  constructor(private readonly http: HttpClient) { }


  public listDevices() {
    const url = rootUrl + '/devices';
    return this.http.get(url, { headers: reqHeader });
  }

  public getDeviceDetail(deviceId: string): Observable<DeviceStats> {
    const url = rootUrl + '/devices/' + deviceId + '/stats';
    return this.http.get<DeviceStats>(url, { headers: reqHeader });
  }

  public rebootDevice(deviceId: string): Observable<any> {
    const url = environment.apis.thingerio.url  + '/v2/users/turboxav/devices/' + deviceId + '/reseting';
    return this.http.post(url, { in: true}, { headers: reqHeaderWithJson });
  }

 

}
