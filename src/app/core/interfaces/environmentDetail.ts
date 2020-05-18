export class EnvironmentDetail {

    private environment = {
        apis: {
            thingerio: {},
            forecast: {}
        }
    }

    public constructor(thingerio, forecast) {
        this.environment.apis.thingerio = thingerio;
        this.environment.apis.forecast = forecast;
    }

    public getThingerIo(): any {
        return !!this.environment.apis ? this.environment.apis.thingerio : null;
    }

    public getForecast(): any {
        return  !!this.environment.apis ? this.environment.apis.forecast : null;
    }
}