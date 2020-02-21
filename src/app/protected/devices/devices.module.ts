import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeviceRoutingModule } from './device-routing.module';
import { MeteoStationComponent } from './meteo-station/meteo-station.component';
import { PlayLedComponent } from './play-led/play-led.component';
import { ListDevicesComponent } from './list-devices/list-devices.component';
import { DetailDeviceComponent } from './detail-device/detail-device.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/core/inerceptors/tokenInterceptor';

@NgModule({
  declarations: [
                  ListDevicesComponent,
                  MeteoStationComponent,
                  PlayLedComponent,
                  DetailDeviceComponent
  ],
  imports: [
    DeviceRoutingModule,
    SharedModule
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class DevicesModule { }
