import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { PlayWithLedComponent } from './play-with-led/play-with-led.component';
import { DevicesComponent } from './devices.component';
import { SharedModule } from '../generic/shared/shared.module';
import { DeviceDetailComponent } from './device-detail/device-detail.component';


@NgModule({
  declarations: [PlayWithLedComponent, DevicesComponent, DeviceDetailComponent],
  imports: [    
    DevicesRoutingModule,
    SharedModule
  ]
})
export class DevicesModule { }
