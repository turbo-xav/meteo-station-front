export class EnvironmentDetail{

    private environment$ : {
    apis: {
        thingerio: {
          url: string,
          account: string,
          device: {
            meteo: {
                name: string,
                buckets: {
                    h24: string,
                    daily: string
                  }
            }
          }
        },
        forecast: {
          url: string
          token: string,
          insee: string,
          city: string
        }
      }
    }

    constructor(thingerio, forecast){
        this.environment$.apis.thingerio = thingerio;
        this.environment$.apis.forecast = forecast
    }

    public getThingerIo(): any{
        return this.environment$ && this.environment$.apis.thingerio ?  this.environment$.apis.thingerio  : null;
    }

    public getForecast(): any{
        return this.environment$ && this.environment$.apis.forecast ?  this.environment$.apis.thingerio  : null;
    }
}