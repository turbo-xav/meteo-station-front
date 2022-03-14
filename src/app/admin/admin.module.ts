import { NgModule } from '@angular/core';
import { SharedModule } from '../generic/shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [],
  imports: [SharedModule, AdminRoutingModule]
})
export class AdminModule {}
