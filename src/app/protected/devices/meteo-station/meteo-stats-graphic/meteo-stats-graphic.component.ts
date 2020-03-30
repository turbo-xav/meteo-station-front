import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MeteoStats } from 'src/app/core/interfaces/meteo-stats';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-meteo-stats-graphic',
  templateUrl: './meteo-stats-graphic.component.html',
  styleUrls: ['./meteo-stats-graphic.component.scss']
})
export class MeteoStatsGraphicComponent implements OnInit {

 
  @Input() meteoStats: MeteoStats[];

  type = 'LineChart';
  title = '';
  datas = [];
  columnNames = [
    'Time',
    'temperature'
  ];
  options = {
    series: {
      0: { pointShape: 'circle' }
    },
    hAxis: {
      title: 'Time'
    },
    vAxis: {
      title: 'Results'
    },
    curveType: 'function',
    pointSize: 2,
    colors: ['#f78f8f'],
    legend: {
      position: 'top'
    },
    crosshair: {
      color: '#ade1fc',
      trigger: 'focus',
      opacity: 0.5

    }
  };

  width: number;
  height: number;

  constructor(
    private readonly translateService: TranslateService
  ) {

  }
  ngOnInit(): void {
    interval(500).subscribe(
      () => {
        this.drawChart();
      });
  }


  public get hasDatas(): boolean {
    return this.datas !== null && this.datas.length > 0;
  }

  public get windowWidth(): number {
    return window.innerWidth;
  }

  private resize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public drawChart() {

    const days = [];
    for (let i = 0; i <= 6; i++) {
      this.translateService.get('stats.days.' + i).subscribe(
        (translation: string) => {
          days[i] = translation;
        }
      );
    }

    if (this.windowWidth < 600) {
      this.resize(400, 300);
    } else if (this.windowWidth < 800) {
      this.resize(600, 450);
    } else if (this.windowWidth < 1200) {
      this.resize(800, 600);
    } else {
      this.resize(1200, 900);
    }

    this.translateService.get('stats.time').subscribe(
      (translation: string) => {
        this.options.hAxis.title = translation;
      }
    );

    this.translateService.get('stats.measurements').subscribe(
      (translation: string) => {
        this.options.vAxis.title = translation;
      }
    );

    this.translateService.get('stats.temperature').subscribe(
      (translation: string) => {
        this.columnNames[1] = translation;
      }
    );

    this.translateService.get('stats.temperature-evolution').subscribe(
      (translation: string) => {
        this.title = translation;
      }
    );

    const datas = [];

    for (const meteoStat of this.meteoStats) {
      const date = new Date(meteoStat.ts);
      const day = days[date.getDay()].substring(0, 3);
      const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
      const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
      const x = `${day}-${hours}:${minutes}`;
      datas.push([x, meteoStat.val.temperature]);
    }
    this.datas = datas;
  }

  public get datasInPaquets(): any[] {
    const packets = [];

    const limit = 10;
    let datasInPackets = [];
    for (let i = 1; i <= this.datas.length; i++) {
      datasInPackets.push(this.datas[i - 1]);
      if (i % limit === 0 || i === this.datas.length) {
        packets.push(datasInPackets);
        datasInPackets = [];
      }
    }
    return packets;
  }

}
