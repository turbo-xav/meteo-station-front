import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationDetailComponent } from './station-detail/station-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ StationDetailComponent],
  imports: [
    SharedModule
  ],
  exports:[
    StationDetailComponent
  ]
})
export class StationModule { }
