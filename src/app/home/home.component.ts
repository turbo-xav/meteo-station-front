import { Component } from '@angular/core';
import {
  PackageJsonInfos,
  PackageJsonService
} from '../generic/core/service/package-json.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private readonly packageJsonService: PackageJsonService) {}

  public get infos(): PackageJsonInfos {
    return this.packageJsonService.infos;
  }
}
