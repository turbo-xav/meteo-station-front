import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { interval } from 'rxjs';
import { MeteoStats } from 'src/app/generic/interfaces/meteo-stats';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {


  @Input() meteoStats?: MeteoStats[];

  type = 'LineChart';
  title = '';
  datas: (string | number)[][] = [];
  columnNames = [
    'Time',
    'temperature'
  ];
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

  constructor(
    private readonly translateService: TranslateService,
    private readonly breakpointObserver: BreakpointObserver
  ) {

    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.WebPortrait,
      Breakpoints.TabletPortrait,

    ]).subscribe(result => {
      if (result.matches) {
        this.resizePortrait();
      }
    });

    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.WebLandscape,
      Breakpoints.TabletLandscape,

    ]).subscribe(result => {
      if (result.matches) {
        this.resizeLandscape();
      }
    });
  }


  ngOnInit(): void {
    this.drawChart();
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

  public get windowHeight(): number {
    return window.innerHeight;
  }

  private resize(width?: number, height?: number): void {
    this.width = !!width ? width : this.windowWidth * 0.9;
    this.height = !!height ? height : this.windowHeight * 1.1;
  }

  private resizePortrait(): void {
    this.resize(this.windowWidth * 0.9, this.windowHeight * 0.7);
  }

  private resizeLandscape(): void {
    this.resize(this.windowWidth * 0.9, this.windowHeight * 0.6);
  }

  public drawChart(): void {

    const days = [];
    for (let i = 0; i <= 6; i++) {
      this.translateService.get('stats.days.' + i).subscribe(
        (translation: string) => {
          days[i] = translation;
        }
      );
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
    let cpt = 0;
    if (this.meteoStats) {
      this.datas = [];
      for (const meteoStat of this.meteoStats) {

        let x = '';

        const date = new Date(meteoStat.ts);
        if (cpt === 0) {
          const day = date.getDate();
          const month = date.getMonth();
          const year = date.getFullYear();
          x = `${day} / ${month} / ${year}`;
        }
        else {
          const dateNow = new Date();
          const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
          const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
          x = 'j' + ((this.dayDiff(date, dateNow) > 0) ? '-' + (this.dayDiff(date, dateNow)) : '') + ` ${hours}:${minutes}`;
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


}
