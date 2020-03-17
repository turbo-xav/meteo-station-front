import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeviceRoutingModule } from './device-routing.module';
import { MeteoStationComponent } from './meteo-station/meteo-station.component';
import { PlayLedComponent } from './play-led/play-led.component';
import { ListDevicesComponent } from './list-devices/list-devices.component';
import { DetailDeviceComponent } from './detail-device/detail-device.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/core/interceptors/tokenInterceptor';
import { ForecastModule } from './meteo-station/forecast/forecast.module';
import { StationModule } from './meteo-station/station/station.module';
import { MeteoStatsComponent } from './meteo-station/meteo-stats/meteo-stats.component';

@NgModule({
  declarations: [
                  ListDevicesComponent,
                  MeteoStationComponent,
                  PlayLedComponent,
                  DetailDeviceComponent,
                  MeteoStatsComponent,
                  MeteoStatsComponent
  ],
  imports: [
    DeviceRoutingModule,
    SharedModule,
    ForecastModule,
    StationModule
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class DevicesModule { }
