import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  PackageJsonService,
  PackageJsonInfos
} from '../../core/service/package-json.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @ViewChild('pRef', { static: false }) pRef?: ElementRef;

  constructor(private readonly packageJsonService: PackageJsonService) {}

  public get infos(): PackageJsonInfos {
    return this.packageJsonService.infos;
  }
}
