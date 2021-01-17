import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MeteoData } from 'src/app/generic/interfaces/meteo-data';
import { MeteoStats } from 'src/app/generic/interfaces/meteo-stats';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  typeStats: 'h24' | 'daily' = 'daily';

  meteoStats: MeteoStats [] = [];

  constructor() {
   this.reload();
  }

  ngOnInit(): void {
    this.typeStats = 'h24';
  }

  reload(): void{
    this.meteoStats = [];
    for (let i = 0 ; i < 45 ; i++ ) {

      const humidity = Math.floor(Math.random() * 50);
      const pressure = Math.floor(Math.random() * 1050);
      const temperature = Math.floor(Math.random() * 25);

      this.meteoStats.push(
        new MeteoStats(
          new Date().getTime() - 86400000 * i  ,
          new MeteoData(humidity, pressure, temperature)
          )
      );
    }
    this.meteoStats.reverse();
  }
}
