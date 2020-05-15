export class EnvironmentDetail {

    private environment = {
        apis: {
            thingerio: {},
            forecast: {}
        }
    }

    public constructor(thingerio, forecast) {
        this.environment.apis.thingerio = thingerio;
        this.environment.apis.forecast = thingerio;
    }

    public getThingerIo(): any {
        return this.environment.apis.thingerio;
    }

    public getForecast(): any {
        return this.environment.apis.forecast;
    }
}