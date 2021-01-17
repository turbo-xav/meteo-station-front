import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForecastsComponent } from './forecasts/forecasts.component';
import { StationComponent } from './station/station.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  { path : '', component: StationComponent },
  { path : 'forecasts', component: ForecastsComponent },
  { path : 'stats', component: StatsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeteoRoutingModule { }
