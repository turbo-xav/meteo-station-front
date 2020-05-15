import { Injectable } from '@angular/core';
import { EnvironmentDetail } from '../interfaces/environmentDetail';
import { AuthService } from './auth.service';
import { from, of, Observable } from 'rxjs';
import * as firebase from 'firebase';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  private environmentDetail:  EnvironmentDetail;

  constructor() { }

  public getEnvironnent(): EnvironmentDetail {

    return this.environmentDetail;
  }

  public setEnvironnent(thingerio, forecast) {
   this.environmentDetail = new EnvironmentDetail( thingerio, forecast);
  }
}
