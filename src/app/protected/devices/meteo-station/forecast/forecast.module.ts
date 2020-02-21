import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastDetailComponent } from './forecast-detail/forecast-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ForecastDetailComponent],
  imports: [
    SharedModule
  ],
  exports: [ForecastDetailComponent ]
})
export class ForecastModule { }
