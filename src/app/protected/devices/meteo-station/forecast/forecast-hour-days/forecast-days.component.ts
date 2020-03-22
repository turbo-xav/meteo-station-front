import { Component, OnInit } from '@angular/core';
import { MeteoService } from 'src/app/core/services/meteo.service';
import { Forecast } from 'src/app/core/interfaces/forecast';
import { Ephemeride } from 'src/app/core/interfaces/ephemeride';

@Component({
  selector: 'app-forecast-days',
  templateUrl: './forecast-days.component.html',
  styleUrls: ['./forecast-days.component.scss']
})
export class ForecastDaysComponent implements OnInit {

  public forecasts: Forecast[];

  public ephemerides: Ephemeride[] = [];

  constructor(
    private readonly meteoService: MeteoService
  ) { }

  ngOnInit() {
    this.meteoService.getForecastDaily().subscribe(
      (forecasts: Forecast[]) => {
        this.forecasts = forecasts;
        for (let i = 0; i < forecasts.length ; i++) {
          this.meteoService.getEphemeride(i).subscribe(
            (ephemeride: Ephemeride) => {
              this.ephemerides[i] = ephemeride;
            }
          );
        }
      }
    );
  }
}
