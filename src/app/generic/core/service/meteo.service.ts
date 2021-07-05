import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ephemeride } from '../../interfaces/ephemeride';
import { Forecast } from '../../interfaces/forecast';
import { Meteo } from '../../interfaces/meteo';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {
  private apiUrl = '';

  constructor(private readonly http: HttpClient) {
    this.apiUrl =
      environment.api.url !== undefined ? environment.api.url : this.apiUrl;
  }

  public getForecasts(): Observable<Meteo[]> {
    return this.http
      .get<Forecast[]>(`${this.apiUrl}/meteo/forecasts/vitry-sur-seine`)
      .pipe(
        mergeMap((forecasts: Forecast[]) => {
          const meteos: Meteo[] = [];

          this.http
            .get<Ephemeride[]>(
              `${this.apiUrl}/meteo/ephemerides/vitry-sur-seine`
            )
            .subscribe((ephemerides: Ephemeride[]) => {
              forecasts.forEach((forecast: Forecast, index: number) => {
                meteos.push(
                  new Meteo(
                    new Forecast(forecast),
                    new Ephemeride(ephemerides[index])
                  )
                );
              });
            });
          return of(meteos);
        })
      );
  }
}
