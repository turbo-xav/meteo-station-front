import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment'
import { Observable, pipe } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DeviceStats } from '../interfaces/device-stats';
import { ResourceState } from '../interfaces/resource-state';
import { map } from 'rxjs/operators';
import { EnvironmentService } from './environment.service';


const reqHeader = new HttpHeaders({});

const reqHeaderWithJson = new HttpHeaders({
  'content-type': 'application/json'
});

/* const rootUrl = environment.apis.thingerio.url;
const rootUrlDevice = rootUrl + '/v1/users/' +  environment.apis.thingerio.account + '/devices';
const rootUrlMeteoStation = rootUrlDevice + '/' + environment.devices.meteo;
 */
@Injectable()
export class DeviceService {

  private rootUrl = '';// = environment.apis.thingerio.url;
  private rootUrlDevice = '';// = this.rootUrl + '/v1/users/' +  environment.apis.thingerio.account + '/devices';
  private rootUrlMeteoStation = '';// = this.rootUrlDevice + '/' + environment.devices.meteo;

  constructor(private readonly http: HttpClient, private readonly environmentService: EnvironmentService) {
    if(this.environmentService.getEnvironnent() && this.environmentService.getEnvironnent().getThingerIo()){
      this.rootUrl = this.environmentService.getEnvironnent().getThingerIo().url;
      this.rootUrlDevice = this.rootUrl + '/v1/users/' +  this.environmentService.getEnvironnent().getThingerIo().account.name + '/devices';
      this.rootUrlMeteoStation = this.rootUrlDevice + '/' + this.environmentService.getEnvironnent().getThingerIo().device.meteo.name;
    }
  }

  public listDevices() {
    return this.http.get(this.rootUrlDevice, { headers: reqHeader });
  }

  public getDeviceDetail(deviceId: string): Observable<DeviceStats> {
    const url = this.rootUrlDevice + '/' + deviceId + '/stats';
    return this.http.get<DeviceStats>(url, { headers: reqHeader });
  }

  public rebootDevice(deviceId: string): Observable<any> {
    const url = this.rootUrl + '/v2/users/' +  environment.apis.thingerio.account + '/devices/' + deviceId + '/reseting';
    return this.http.post(url, { in: true }, { headers: reqHeaderWithJson });
  }

  public switchResource(ressourceId: string, state: ResourceState, invert = false): Observable<any> {
    const url = this.rootUrlMeteoStation + '/' + ressourceId;
    const stateExpression = state !== ResourceState.ON;
    return this.http.post(url, { in: stateExpression }, { headers: reqHeaderWithJson });
  }

  public getResourceState(ressourceId: string): Observable<any> {
    const url = this.rootUrlMeteoStation + '/' + ressourceId + '-state';
    return this.http.get<any>(url, { headers: reqHeader }).pipe(
      map((res: any) => {
        return res.state ? res.state : ResourceState.OFF;
    }));
  }

}
