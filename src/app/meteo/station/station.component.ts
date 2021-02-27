import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { StationService } from 'src/app/generic/core/service/station.service';
import { Measurement } from 'src/app/generic/interfaces/mesurement';
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
  measurement?: Measurement;

  private stationsubscription?: Subscription;
  private measurementsSubscription?: Subscription;

  constructor(
    private readonly stationService: StationService
  ) {

  }

  ngOnInit(): void {
    this.checkAll();
  }

  checkAll(): void {
    // Immediately state
    this.checkAllMeasurements();
    this.checkAllStates();

    // Ineval checking
    this.checkMeasurements();
    this.checkStates();
  }

  checkMeasurements(): void {
    this.destroyMesureSubscription();
    this.measurementsSubscription = interval(1000).subscribe(
      () => {
       this.checkAllMeasurements();
      }
    );
  }

  checkAllMeasurements(): void {
    this.stationService.getMeasurement().subscribe(
      (measurement: Measurement) => {
        this.measurement = measurement;
      }
    );
  }

  checkStates(): void {
    this.detroyStationSubscriptions();
    this.stationsubscription = interval(3000).subscribe(
      (ae) => {
        this.checkAllStates();
      }
    );
  }

  checkAllStates(): void {
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

  toggleHeater(): void {
    const switchState: SwitchState = { state: this.heaterIsOn ? 'OFF' : 'ON' };
    this.stationService.switch('heater', switchState).subscribe(
      () => {
        this.checkStates();
        this.heaterIsOn = !this.heaterIsOn;
      }
    );
  }

  toggleLed(): void {
    const switchState: SwitchState = { state: this.ledIsOn ? 'OFF' : 'ON' };
    this.stationService.switch('led', switchState).subscribe(
      () => {
        this.checkStates();
        this.ledIsOn = !this.ledIsOn;
      }
    );
  }

  toggleScreen(): void {
    const switchState: SwitchState = { state: this.screenIsOn ? 'OFF' : 'ON' };
    this.stationService.switch('screen', switchState).subscribe(
      () => {
        this.checkStates();
        this.screenIsOn = !this.screenIsOn;
      }
    );
  }

  private detroyStationSubscriptions(): void {
    if (this.stationsubscription) {
      this.stationsubscription.unsubscribe();
    }
  }

  private destroyMesureSubscription(): void {

    if (this.measurementsSubscription) {
      this.measurementsSubscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    this.destroyMesureSubscription();
    this.detroyStationSubscriptions();
  }


}
