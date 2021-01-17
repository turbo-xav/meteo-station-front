import { Component, OnInit } from '@angular/core';
import { PackageJsonInfos, PackageJsonService } from '../generic/core/service/package-json.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private readonly packageJsonService: PackageJsonService) { }

  ngOnInit(): void {
  }

  public get infos(): PackageJsonInfos {
    return this.packageJsonService.infos;
  }

}
