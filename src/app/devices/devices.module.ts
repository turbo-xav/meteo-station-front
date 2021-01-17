import { NgModule } from '@angular/core';

import { DevicesRoutingModule } from './devices-routing.module';
import { DevicesComponent } from './devices.component';
import { SharedModule } from '../generic/shared/shared.module';
import { DeviceDetailComponent } from './device-detail/device-detail.component';


@NgModule({
  declarations: [DevicesComponent, DeviceDetailComponent],
  imports: [    
    DevicesRoutingModule,
    SharedModule
  ]
})
export class DevicesModule { }
