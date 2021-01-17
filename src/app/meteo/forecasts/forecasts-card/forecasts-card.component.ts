import { Component, OnInit, Input } from '@angular/core';
import { Meteo } from '../../../generic/interfaces/meteo';
@Component({
  selector: 'app-forecasts-card',
  templateUrl: './forecasts-card.component.html',
  styleUrls: ['./forecasts-card.component.scss']
})
export class ForecastsCardComponent implements OnInit {

  @Input() small: any;

  @Input() meteo: Meteo;

  constructor() {

  }

  ngOnInit(): void {
  }

}
