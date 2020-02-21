import { Component, OnInit, Input } from '@angular/core';
import { Meteo } from 'src/app/core/interfaces/meteo';

@Component({
  selector: 'app-station-detail',
  templateUrl: './station-detail.component.html',
  styleUrls: ['./station-detail.component.scss']
})
export class StationDetailComponent implements OnInit {

  @Input() meteo: Meteo;

  constructor() { }

  ngOnInit() {
  }

}
