import { Component, OnInit, Input } from '@angular/core';
import { MeteoData } from 'src/app/core/interfaces/meteo-data';

@Component({
  selector: 'app-station-detail',
  templateUrl: './station-detail.component.html',
  styleUrls: ['./station-detail.component.scss']
})
export class StationDetailComponent implements OnInit {

  @Input() meteo: MeteoData;

  constructor() { }

  ngOnInit() {
  }

}
