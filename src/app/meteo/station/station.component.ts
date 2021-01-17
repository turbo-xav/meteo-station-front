import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.scss']
})
export class StationComponent implements OnInit {

  heaterIsOn = false;
  ledIsOn = false;
  screenIsOn = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleHeater(): void{
    this.heaterIsOn = ! this.heaterIsOn;
  }

  toggleLed(): void{
    this.ledIsOn = ! this.ledIsOn;
  }

  toggleScreen(): void{
    this.screenIsOn = ! this.screenIsOn;
  }


}
