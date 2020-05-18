import { ForecastEnv } from './forecast-env';
import { AccountIo } from './account-io';
import { ThingerIoEnv } from './thingerio-env';

export class EnvironmentDetail {


    constructor(public thingerIo: ThingerIoEnv, public forecast: ForecastEnv) {
    }

    public getThingerIo(): any {
        return this.thingerIo;
    }

    public getForecast(): any {
        return this.forecast;
    }
}