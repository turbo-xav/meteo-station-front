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

  selectedGraphic = 'h24';

  graphics = [];

  constructor(
    private readonly meteoService: MeteoService,
    private readonly translateService: TranslateService
  ) { }

  ngOnInit() {
    interval(500).subscribe(
      () => {
        this.graphics = [];
        this.translateService.get('stats.h24').subscribe(
          (translation: string) => {
            this.graphics.push({ id: 'h24', name: translation });
          }
        );
        this.translateService.get('stats.daily').subscribe(
          (translation: string) => {
            this.graphics.push({ id: 'daily', name: translation });
          }
        );
      });
    this.checkDatas();
    this.meteoStatsSubscription = interval(1000).subscribe(
      () => {
        this.checkDatas();
      });
  }

  public get hasDatas(): boolean {
    return !!this.meteoStats;
  }

  checkDatas() {
    if (this.selectedGraphic === 'h24') {
      this.meteoService.getMeteoStatsH24().subscribe(
        (meteoStats: MeteoStats[]) => {
          this.meteoStats = meteoStats.reverse();
        }
      );
    } else if (this.selectedGraphic === 'daily') {
      this.meteoService.getMeteoStatsDaily().subscribe(
        (meteoStats: MeteoStats[]) => {
          this.meteoStats = meteoStats.reverse();
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.meteoStatsSubscription) { this.meteoStatsSubscription.unsubscribe(); }
  }

}
