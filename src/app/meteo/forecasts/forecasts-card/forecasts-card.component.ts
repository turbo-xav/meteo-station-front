import { Component,  Input, ViewEncapsulation } from '@angular/core';
import { Meteo } from 'src/app/generic/interfaces/meteo';
@Component({
  selector: 'app-forecasts-card',
  templateUrl: './forecasts-card.component.html',
  styleUrls: ['./forecasts-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForecastsCardComponent {
  @Input() meteo?: Meteo;
}
