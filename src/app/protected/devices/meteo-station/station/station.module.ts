import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationDetailComponent } from './station-detail/station-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StationCommandComponent } from './station-command/station-command.component';

@NgModule({
  declarations: [ StationDetailComponent, StationCommandComponent],
  imports: [
    SharedModule
  ],
  exports:[
    StationDetailComponent,
    StationCommandComponent
  ]
})
export class StationModule { }
