import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicModule } from '../public/public.module';
import { ProtectedModule } from '../protected/protected.module';
import { AuthService } from './services/auth.service';
import { MeteoService } from './services/meteo.service';
import { DeviceService } from './services/device.service';
import { HttpClient } from '@angular/common/http';
import { DisplayService } from './services/display.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PublicModule,
    ProtectedModule
  ],
  providers:[
    AuthService,
    MeteoService,
    DeviceService,
    DisplayService,
    HttpClient
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded.');
    }
  }
}
