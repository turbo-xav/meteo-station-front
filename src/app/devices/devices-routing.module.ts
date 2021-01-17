import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayWithLedComponent } from './play-with-led/play-with-led.component';
import { DevicesComponent } from './devices.component';

const routes: Routes = [
  { path : '', component: DevicesComponent },
  { path : 'play-with-led', component: PlayWithLedComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
