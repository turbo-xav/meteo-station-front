import { NgModule } from '@angular/core';
import { ForecastDetailComponent } from './forecast-detail/forecast-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ForecastDaysComponent } from './forecast-hour-days/forecast-days.component';




@NgModule({
  declarations: [ForecastDetailComponent, ForecastDaysComponent],
  imports: [
    SharedModule
  ],
  exports: [ForecastDetailComponent ]
})
export class ForecastModule { }
