import { Forecast } from './forecast';
import { Ephemeride } from './ephemeride';
export class Meteo {
    constructor(public forecast: Forecast, public ephemeride: Ephemeride) { }
  }