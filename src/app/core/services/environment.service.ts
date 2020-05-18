import { Injectable } from '@angular/core';
import { EnvironmentDetail } from '../interfaces/environment/environmentDetail';
import { ForecastEnv } from '../interfaces/environment/forecast-env';
import { ThingerIoEnv } from '../interfaces/environment/thingerio-env';
import { AccountIo } from '../interfaces/environment/account-io';
@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() { }

  public getEnvironnent(): EnvironmentDetail {
    const environmentDetail =  !!localStorage.getItem('env') ? JSON.parse(localStorage.getItem('env')): null ;
    if(!!environmentDetail && !!environmentDetail.thingerIo && !!environmentDetail.forecast){
      return new EnvironmentDetail( environmentDetail.thingerIo, environmentDetail.forecast);
    }
    return null;
  }

  public setEnvironnent(thingerIo, forecast) {
    const accountIo = new AccountIo(thingerIo.account.name, thingerIo.account.password);
    const thingerIoEnv = new ThingerIoEnv( thingerIo.url , accountIo, thingerIo.device);
    const forecastEnv: ForecastEnv = new ForecastEnv(forecast.url, forecast.token, forecast.insee, forecast.city);
    const environmentDetail = new EnvironmentDetail( thingerIoEnv, forecastEnv);
    localStorage.setItem('env', JSON.stringify(environmentDetail));
  }

  public destroyEnv(){
    localStorage.removeItem('env');
  }
}
