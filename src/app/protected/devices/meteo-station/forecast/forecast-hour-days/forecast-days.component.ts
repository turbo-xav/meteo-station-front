import { Component, OnInit } from '@angular/core';
import { MeteoService } from 'src/app/core/services/meteo.service';
import { Forecast } from 'src/app/core/interfaces/forecast';

@Component({
  selector: 'app-forecast-days',
  templateUrl: './forecast-days.component.html',
  styleUrls: ['./forecast-days.component.scss']
})
export class ForecastDaysComponent implements OnInit {

  public forecasts: Forecast[]

  constructor(
    private readonly meteoService: MeteoService
  ) { }

  ngOnInit() {
    this.meteoService.getForecastDaily().subscribe(
      (forecasts: Forecast[]) => {
        this.forecasts = forecasts;
        console.log(this.forecasts);
      }
    );
  }

}
