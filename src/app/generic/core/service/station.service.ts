import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Measurement } from '../../interfaces/mesurement';
import { SwitchState } from '../../interfaces/switch-state';
import { RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  private apiUrl = '';

  constructor(private readonly restApiService: RestApiService) {
    this.apiUrl =
      environment.api.url !== undefined ? environment.api.url : this.apiUrl;
  }

  public switch(resource: string, state: SwitchState): Observable<SwitchState> {
    return this.restApiService.put<SwitchState>(
      `${this.apiUrl}/station/device/${resource}`,
      state
    );
  }

  public getState(resource: string): Observable<SwitchState> {
    return this.restApiService.get<SwitchState>(
      `${this.apiUrl}/station/device/${resource}/state`
    );
  }

  public getMeasurement(): Observable<Measurement> {
    return this.restApiService.get<Measurement>(
      `${this.apiUrl}/station/device/measurement`
    );
  }
}
