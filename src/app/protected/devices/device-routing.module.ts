import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDevicesComponent } from './list-devices/list-devices.component';
import { PlayLedComponent } from './play-led/play-led.component';
import { MeteoStationComponent } from './meteo-station/meteo-station.component';
import { AuthGuard } from 'src/app/core/guards/auth-guard';
import { MeteoStatsComponent } from './meteo-station/meteo-stats/meteo-stats.component';


const routes: Routes = [
    { path: 'devices', component: ListDevicesComponent, canActivate: [AuthGuard]},
    { path: 'play-led', component: PlayLedComponent, canActivate: [AuthGuard] },
    { path: 'meteo-station', component: MeteoStationComponent, canActivate: [AuthGuard] },
    { path: 'meteo-station/stats', component: MeteoStatsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule { }
