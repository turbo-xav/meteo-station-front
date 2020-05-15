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
        return this.environment && this.environment.apis.thingerio ? this.environment.apis.thingerio : null;
    }

    public getForecast(): any {
        return this.environment && this.environment.apis.forecast ? this.environment.apis.thingerio : null;
    }
}