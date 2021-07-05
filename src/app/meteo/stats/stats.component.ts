import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/generic/core/service/stats.service';
import { MeteoStats } from 'src/app/generic/interfaces/meteo-stats';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  typeStats: 'h24' | 'daily' = 'daily';

  meteoStats: MeteoStats[] = [];

  constructor(private readonly statsService: StatsService) {
    this.reload();
  }

  ngOnInit(): void {
    this.typeStats = 'h24';
  }

  reload(): void {
    const meteoStatsSubscription =
      this.typeStats === 'daily'
        ? this.statsService.getStatsDaily()
        : this.statsService.getStatsRealTime();
    meteoStatsSubscription.subscribe((meteoStats: MeteoStats[]) => {
      meteoStats.reverse();
      this.meteoStats = meteoStats;
    });
  }
}
