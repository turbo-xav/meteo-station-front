import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MeteoStats } from '../../interfaces/meteo-stats';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = '';

  constructor(private readonly restApiService: RestApiService) {
    this.apiUrl =
      environment.api.url !== undefined ? environment.api.url : this.apiUrl;
  }

  public getStatsDaily(): Observable<MeteoStats[]> {
    return this.restApiService.get<MeteoStats[]>(
      `${this.apiUrl}/station/stats/daily`
    );
  }

  public getStatsRealTime(): Observable<MeteoStats[]> {
    return this.restApiService.get<MeteoStats[]>(
      `${this.apiUrl}/station/stats/realtime`
    );
  }
}
