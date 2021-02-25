import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Device } from '../../interfaces/device';
import { flatMap, map } from 'rxjs/operators';
import { DeviceStats } from '../../interfaces/device-stats';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  private urlApi = '';

  constructor(private readonly http: HttpClient) {
    console.log(environment.api.url);
    this.urlApi = environment.api.url !== undefined ? environment.api.url : this.urlApi;
  }

  public getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.urlApi}/station/devices`).pipe();
  }

  public getDevice(): Observable<Device> {
    return this.http.get<Device>(`${this.urlApi}/station/device`).pipe(
      flatMap((device: Device) => {
        return this.http.get<DeviceStats>(`${this.urlApi}/station/device/stats`).pipe(
          map((stats: DeviceStats) => {
            if (device.connection !== undefined) {
              device.connection.rx_bytes = stats.rx_bytes;
              device.connection.tx_bytes = stats.tx_bytes;
            }
            return new Device(device);
          })
        );
      })
    );
  }
}
