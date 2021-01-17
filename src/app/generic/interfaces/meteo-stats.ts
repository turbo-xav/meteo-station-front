import { MeteoData } from './meteo-data';

export class MeteoStats {
    constructor(
        public ts: number,
        public val: MeteoData){

        }
}
