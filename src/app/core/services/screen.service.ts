import { Injectable } from '@angular/core';
import { ScreenState } from '../interfaces/screen-state';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment'
import { map } from 'rxjs/operators';

const reqHeader = new HttpHeaders({});

const reqHeaderWithJson = new HttpHeaders({
  'content-type': 'application/json'
});

const rootUrl = environment.apis.thingerio.url + '/v2/users/turboxav/devices/' + environment.devices.meteo;

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(private readonly http: HttpClient) { }

  public switchScreen(screenState: ScreenState): Observable<any> {
    console.log('Screen state : ',screenState);
    const url = rootUrl + '/led';
    return this.http.post(url, { in: screenState === ScreenState.ON}, { headers: reqHeaderWithJson });
  }

  public checkScreen(): Observable<any> {
    const url =  rootUrl + '/led-state';
    return this.http.get<any>(url, { headers: reqHeader });
  }

  public getScreenState(): Observable<any> {
    const url = rootUrl +  '/led-state';
    return this.http.get<any>(url, { headers: reqHeader }).pipe(
      map((res: any) => {
        return res.out.state ? res.out.state : ScreenState.OFF;
    }));
  }
}
