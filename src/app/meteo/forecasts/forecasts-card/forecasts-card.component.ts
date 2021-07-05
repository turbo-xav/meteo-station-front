import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Meteo } from '../../../generic/interfaces/meteo';
@Component({
  selector: 'app-forecasts-card',
  templateUrl: './forecasts-card.component.html',
  styleUrls: ['./forecasts-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForecastsCardComponent implements OnInit {
  @Input() meteo?: Meteo;

  constructor() {}
}
