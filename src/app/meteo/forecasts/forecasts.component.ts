import { Component, OnInit } from '@angular/core';
import { Meteo } from 'src/app/generic/interfaces/meteo';
import { Forecast } from 'src/app/generic/interfaces/forecast';
import { Ephemeride } from 'src/app/generic/interfaces/ephemeride';


@Component({
  selector: 'app-forecasts',
  templateUrl: './forecasts.component.html',
  styleUrls: ['./forecasts.component.scss']
})
export class ForecastsComponent implements OnInit {

  meteoToday?: Meteo;
  meteoForecasts: Meteo[] = [];
  selectedTab = 0;
  swipeCoord: [number, number] = [0, 0];
  swipeTime?: number;

  constructor() {

    let date = new Date();

    this.meteoToday = new Meteo(new Forecast(3, 25, 12, 22, date.toDateString()), new Ephemeride('06:30', '19:55'));
    this.meteoForecasts.push(this.meteoToday);
    for (let i = 0; i <= 14; i++) {
      date = new Date(date.getTime() + 86400000);

      this.meteoForecasts.push(
        new Meteo(new Forecast(1, 15, 15, 23, date.toDateString()), new Ephemeride('06:30', '19:55')));
    }
  }

  ngOnInit(): void {
  }

  swipe(e: Event, when: string): void {
    if (e instanceof TouchEvent) {
      const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
      this.moveTab(coord, when);
    }else if (e instanceof MouseEvent) {
      const coord: [number, number] = [e.clientX, e.clientY];
      this.moveTab(coord, when);
    }
  }

  moveTab(coord: [number, number], when: string): void {
    const time = new Date().getTime();
    const isFirst = this.selectedTab <= 0;
    const isLast = this.selectedTab >= this.meteoForecasts.length - 1;

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;
      if (duration < 1000 && Math.abs(direction[0]) > 30  && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) {
        const swipe = direction[0] < 0 ? 'next' : 'previous';
        if (swipe === 'next') {
            this.selectedTab = isLast ? this.meteoForecasts.length - 1 : ( isFirst ? 1 : this.selectedTab + 1 );
        } else if (swipe === 'previous') {
          this.selectedTab = isLast ? this.meteoForecasts.length - 2 : ( isFirst ? 0 : this.selectedTab - 1 );
        }
      }
    }
  }

}
