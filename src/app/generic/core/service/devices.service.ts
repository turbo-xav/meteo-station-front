import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Device } from 'src/app/generic/interfaces/device';
import { mergeMap, map } from 'rxjs/operators';
import { DeviceStats } from 'src/app/generic/interfaces/device-stats';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private apiUrl = '';

  constructor(private readonly http: HttpClient) {
    this.apiUrl =
      environment.api.url !== undefined ? environment.api.url : this.apiUrl;
  }

  public getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.apiUrl}/station/devices`).pipe();
  }

  public getDevice(): Observable<Device> {
    return this.http.get<Device>(`${this.apiUrl}/station/device`).pipe(
      mergeMap((device: Device) => {
        return this.http
          .get<DeviceStats>(`${this.apiUrl}/station/device/stats`)
          .pipe(
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
