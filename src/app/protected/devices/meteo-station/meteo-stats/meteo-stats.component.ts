import { Component, OnInit, OnDestroy } from '@angular/core';
import { MeteoService } from 'src/app/core/services/meteo.service';
import { MeteoStats } from 'src/app/core/interfaces/meteo-stats';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-meteo-stats',
  templateUrl: './meteo-stats.component.html',
  styleUrls: ['./meteo-stats.component.scss']
})
export class MeteoStatsComponent implements OnInit, OnDestroy {

  meteoStats: MeteoStats[];
  meteoStatsSubscription: Subscription;

  constructor(
    private readonly meteoService: MeteoService
  ) {

  }

  ngOnInit() {
    this.checkDatas();
    this.meteoStatsSubscription = interval(30000).subscribe(
      () => {
        this.checkDatas();
      });
  }

  public get hasDatas(): boolean {
    return !!this.meteoStats;
  }

  checkDatas() {
    this.meteoService.getMeteoStats().subscribe(
      (meteoStats: MeteoStats[]) => {
        this.meteoStats = meteoStats;
      }
    );
  }

  ngOnDestroy() {
    if (this.meteoStatsSubscription) { this.meteoStatsSubscription.unsubscribe(); }
  }

}
