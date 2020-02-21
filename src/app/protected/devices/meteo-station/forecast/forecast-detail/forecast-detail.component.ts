import { Component, OnInit, Input } from '@angular/core';
import { Ephemeride } from 'src/app/core/interfaces/ephemeride';
import { Forecast } from 'src/app/core/interfaces/forecast';
import { MeteoService } from 'src/app/core/services/meteo.service';

@Component({
  selector: 'app-forecast-detail',
  templateUrl: './forecast-detail.component.html',
  styleUrls: ['./forecast-detail.component.scss']
})
export class ForecastDetailComponent {

  @Input() public ephemeride: Ephemeride;
  @Input() public forecast: Forecast;

   constructor() {

  }

}
