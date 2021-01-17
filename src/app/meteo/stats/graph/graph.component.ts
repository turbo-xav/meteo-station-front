import { Component, HostListener, Input, OnInit } from '@angular/core';
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


  @Input() meteoStats: MeteoStats[];

  type = 'LineChart';
  title = '';
  datas = [];
  columnNames = [
    'Time',
    'temperature'
  ];
  options = {
    chartArea:{
      left:55,
      right:55,
      bottom:60,
      top:60     
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

  width: number;
  height: number;

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
  
  private resize(width?: number, height?: number) {
    this.width = !!width ? width: this.windowWidth * 0.9;
    this.height = !!height ? height : this.windowHeight * 1.1 ;
  }

  private resizePortrait() {
    this.resize(this.windowWidth * 0.9, this.windowHeight * 0.65 );    
  }

  private resizeLandscape() {
    this.resize(this.windowWidth * 0.9, this.windowHeight * 0.55 );     
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
    let cpt = 0;
    if (this.meteoStats) {
      for (const meteoStat of this.meteoStats) {

        const dateNow = new Date();
        const dayNow = dateNow.getDate();
        const monthNow = dateNow.getMonth();
        const yearNow = dateNow.getFullYear();

        const date = new Date(meteoStat.ts);
        const day = dateNow.getDate();
        const month = dateNow.getMonth();
        const year = dateNow.getFullYear();
        const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

        let x = '';
        if (cpt === 0) {
          x = `${dayNow} / ${monthNow} / ${yearNow}`;
        }
        else {
          x = 'j' + ((this.dayDiff(date, dateNow) > 0) ? '-' + (this.dayDiff(date, dateNow)) : '') + ` ${hours}:${minutes}`;
        }
        datas.push([x, meteoStat.val.temperature]);
        cpt++;

      }
      this.datas = datas;
    }
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

  dayDiff(dFuture: Date, dPaste: Date): number {
    const timeFuture = dFuture.getTime() / 86400000;
    const timePaste = dPaste.getTime() / 86400000;
    return Number((timePaste - timeFuture).toFixed(0));
  }


}
