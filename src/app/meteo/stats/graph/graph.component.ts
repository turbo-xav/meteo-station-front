import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { interval, Subscription } from 'rxjs';
import { MeteoStats } from 'src/app/generic/interfaces/meteo-stats';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, OnDestroy {
  @Input() meteoStats?: MeteoStats[];
  @Input() typeStats?: 'h24' | 'daily';

  type: ChartType = ChartType.LineChart;
  title = '';
  datas: (string | number)[][] = [];
  columnNames = ['Time', 'Temperature'];
  options = {
    chartArea: {
      left: 55,
      right: 55,
      bottom: 60,
      top: 60
    },
    series: {
      0: { pointShape: 'circle' }
    },
    hAxis: {
      title: 'Time',
      textStyle: {
        color: '#007BFF',
        bold: true,
        fontSize: 10
      }
    },
    vAxis: {
      title: '°C',
      textStyle: {
        color: '#007BFF',
        bold: true,
        fontSize: 12
      }
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

  width = 0;
  height = 0;

  private drawingSubscription?: Subscription;

  @HostListener('window:resize', ['$event'])
  getScreenSize(): void {
    this.height = 0.55 * window.innerHeight;
    this.width = 0.95 * window.innerWidth;
  }

  constructor(private readonly translateService: TranslateService) {
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.drawChart();
    this.drawingSubscription = interval(1000).subscribe(() => {
      this.drawChart();
    });
  }

  public get hasDatas(): boolean {
    return this.datas !== null && this.datas.length > 0;
  }

  public get windowWidth(): number {
    return window.innerWidth;
  }

  public get windowHeight(): number {
    return window.innerHeight;
  }

  public drawChart(): void {
    const days = [];
    for (let i = 0; i <= 6; i++) {
      days[i] = this.translateService.instant(`stats.days.${i}`);
    }
    // Axis titles
    this.options.hAxis.title = this.translateService.instant('stats.time');
    this.options.vAxis.title =
      this.translateService.instant('stats.measurements');

    // Legendary
    this.columnNames[1] = this.translateService.instant('stats.temperature');

    //Title
    this.title = this.translateService.instant('stats.temperature-evolution');
    const titleH24: string = this.translateService.instant(
      'stats.temperature-evolution-h24'
    );
    const titleDaily: string = this.translateService.instant(
      'stats.temperature-evolution-daily'
    );

    this.title += this.typeStats === 'h24' ? ` - ${titleH24}` : '';
    this.title += this.typeStats === 'daily' ? ` - ${titleDaily}` : '';

    // Day X Axis
    let cpt = 0;
    if (this.meteoStats) {
      this.datas = [];
      for (const meteoStat of this.meteoStats) {
        let x = '';

        const date = new Date(meteoStat.ts);
        if (cpt === 0) {
          const day =
            date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
          const month =
            date.getMonth() + 1 < 10
              ? `0${date.getMonth() + 1}`
              : date.getMonth() + 1;
          const year = date.getFullYear();

          x = `${day} / ${month} / ${year}`;
        } else {
          const dateNow = new Date();
          const hours =
            date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
          const minutes =
            date.getMinutes() < 10
              ? `0${date.getMinutes()}`
              : `${date.getMinutes()}`;
          x =
            'j' +
            (this.dayDiff(date, dateNow) > 0
              ? `-${this.dayDiff(date, dateNow)}`
              : '') +
            ` ${hours}:${minutes}`;
        }

        this.datas.push([x, meteoStat.val.temperature]);
        cpt++;
      }
    }
  }

  dayDiff(dFuture: Date, dPaste: Date): number {
    const timeFuture = dFuture.getTime() / 86400000;
    const timePaste = dPaste.getTime() / 86400000;
    return Number((timePaste - timeFuture).toFixed(0));
  }

  ngOnDestroy(): void {
    if (this.drawingSubscription !== undefined) {
      this.drawingSubscription.unsubscribe();
    }
  }
}
