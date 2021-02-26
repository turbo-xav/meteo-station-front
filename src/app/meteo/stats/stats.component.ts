import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StatsService } from 'src/app/generic/core/service/stats.service';
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

  constructor(private readonly statsService: StatsService) {
   this.reload();
  }

  ngOnInit(): void {
    this.typeStats = 'h24';
  }

  reload(): void{
    console.log(this.typeStats);
    const meteoStatsSubscription = this.typeStats === 'daily' ? this.statsService.getStatsDaily() : this.statsService.getStatsRealTime();
    meteoStatsSubscription.subscribe(
      (meteoStats: MeteoStats[]) => {
        meteoStats.reverse();
        this.meteoStats = meteoStats;
      }
    );
    /*this.meteoStats = [];
    for (let i = 0 ; i < 45 ; i++ ) {
      console.log('change');
      const humidity = Math.floor(Math.random() * 50);
      const pressure = Math.floor(Math.random() * 1050);
      const temperature = Math.floor(Math.random() * 25);

      this.meteoStats.push(
        new MeteoStats(
          new Date().getTime() - 86400000 * i  ,
          new MeteoData(humidity, pressure, temperature)
          )
      );
    }*/
   
  }
}
