import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicModule } from '../public/public.module';
import { ProtectedModule } from '../protected/protected.module';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { MeteoService } from './services/meteo.service';
import { LedService } from './services/led.service';
import { DeviceService } from './services/device.service';

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
    LedService,
    DeviceService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded.');
    }
  }
}
