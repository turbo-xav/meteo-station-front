import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Measurement } from '../../interfaces/mesurement';
import { SwitchState } from '../../interfaces/switch-state';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  private apiUrl = '';

  constructor(private readonly http: HttpClient) {
    this.apiUrl = environment.api.url !== undefined ? environment.api.url : this.apiUrl;
  }

  public switch(resource: string, state: SwitchState): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/station/device/${resource}`, state);
  }

  public getState(resource: string): Observable<SwitchState> {
    return this.http.get<SwitchState>(`${this.apiUrl}/station/device/${resource}/state`);
  }

  public getMeasurement(): Observable<Measurement> {
    return this.http.get<Measurement>(`${this.apiUrl}/station/device/measurement`);
  }
}
