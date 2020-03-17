import { Component, OnInit, OnDestroy } from '@angular/core';
import { MeteoService } from 'src/app/core/services/meteo.service';
import { MeteoStats } from 'src/app/core/interfaces/meteo-stats';
import { TranslateService } from '@ngx-translate/core';
import { transition } from '@angular/animations';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-meteo-stats',
  templateUrl: './meteo-stats.component.html',
  styleUrls: ['./meteo-stats.component.scss']
})
export class MeteoStatsComponent implements OnInit, OnDestroy {

  meteoStats: MeteoStats[];
  displayStats: MeteoStats[];
  meteoStatsSubscription: Subscription;
  title = 'Average Temperatures';
  type = 'LineChart';
  datas = [
  ];
  columnNames = [
    "Time",
    "Vitry sur Seine"];
  options = {
    hAxis: {
      title: 'Month'
    },
    vAxis: {
      title: 'Temperature'
    },
    curveType: 'function',
    legend: { position: 'top' }
  };
  width = 800;
  height = 600;

  constructor(
    private readonly meteoService: MeteoService,
    private readonly translateService: TranslateService
  ) {

  }

  ngOnInit() {
    this.checkDatas();
    this.meteoStatsSubscription = interval(30000).subscribe(
      () => {
        this.checkDatas();
      });
  }
  ngOnDestroy() {
    if (this.meteoStatsSubscription) { this.meteoStatsSubscription.unsubscribe(); }
  }

  checkDatas() {
    this.meteoService.getMeteoStats().subscribe(
      (meteoStats: MeteoStats[]) => {        

       this.meteoStats = meteoStats;
       this.displayStats = this.meteoStats.reverse();
       this.drawChart();

      }
    );
  }

  public get hasDatas(): boolean {
    return this.datas !== null && this.datas.length > 0;
  }

 

  public drawChart() {

    const days = [
      'Dim',
      'Lun',
      'Mar',
      'Mer',
      'Jeu',
      'Ven',
      'Sam'
    ];

    this.translateService.get('stats.time').subscribe(
      (translation: string) => {
        this.options.hAxis.title = translation;
      }
    );

    this.translateService.get('stats.temperature').subscribe(
      (translation: string) => {
        this.options.vAxis.title = translation;
      }
    );

    this.translateService.get('stats.temperature-evolution').subscribe(
      (translation: string) => {
        this.title = translation;
      }
    );

    const datas = [];

    for (const meteoStat of this.displayStats) {
      const date = new Date(meteoStat.ts);
      const day = days[date.getDay()];
      const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      const x =`${day}-${hours}:${minutes}`;
      datas.push([x, meteoStat.val.temperature]);
    }
    this.datas = datas;

  }
}
