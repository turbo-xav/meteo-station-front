import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DeviceService } from './device.service';
import { map } from 'rxjs/operators';


const reqHeader = new HttpHeaders({});

const reqHeaderWithJson = new HttpHeaders({
  'content-type': 'application/json'
});

const rootUrl = environment.apis.thingerio.url;
const rootUrlDevice = rootUrl + '/v2/users/' + environment.devices.account + '/devices/' + environment.devices.meteo;

@Injectable()
export class LedService {

  constructor(
    private readonly http: HttpClient,
    private readonly deviceService: DeviceService) { }

  public getStats() {
    return this.deviceService.getDeviceDetail(environment.devices.meteo);
  }
 
}
