import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { StationService } from 'src/app/generic/core/service/station.service';
import { SwitchState } from 'src/app/generic/interfaces/switch-state';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit, OnDestroy {

  heaterIsOn = false;
  ledIsOn = false;
  screenIsOn = false;

  private subscription: Subscription;

  constructor(
    private readonly stationService: StationService
  ) { 
    this.subscription = interval(1000).subscribe(
      () => {
        console.log('1');
        this.stationService.getState('led').subscribe(
          (switchState: SwitchState) => {
            this.ledIsOn = switchState.state === 'ON';
          }
        );
        this.stationService.getState('screen').subscribe(
          (switchState: SwitchState) => {
            this.screenIsOn = switchState.state === 'ON';
          }
        );
        this.stationService.getState('heater').subscribe(
          (switchState: SwitchState) => {
            this.heaterIsOn = switchState.state === 'ON';
          }
        );
      }
    );
  }

  ngOnInit(): void {
  }

  toggleHeater(): void{
    const switchState: SwitchState = { state : this.heaterIsOn ? 'OFF' : 'ON' };
    this.stationService.switch('heater', switchState).subscribe(
      () => {
        this.heaterIsOn = ! this.heaterIsOn;
      }
    );

  }

  toggleLed(): void{
    const switchState: SwitchState = { state : this.ledIsOn ? 'OFF' : 'ON' };
    this.stationService.switch('led', switchState).subscribe(
      () => {
        this.ledIsOn = ! this.ledIsOn;
      }
    );

  }

  toggleScreen(): void{
    const switchState: SwitchState = { state : this.screenIsOn ? 'OFF' : 'ON' };
    this.stationService.switch('screen', switchState).subscribe(
      () => {
        this.screenIsOn = ! this.screenIsOn;
      }
    );
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }


}
