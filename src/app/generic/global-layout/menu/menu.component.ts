import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterContentInit, AfterContentChecked } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { TranslateService } from '@ngx-translate/core';
import { PackageJsonService, PackageJsonInfos } from '../../core/service/package-json.service';
import { ViewEncapsulation } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit  {

  @ViewChild('menuTrigger')
  matMenu: MatMenuTrigger;

  @ViewChild('matSelectLanguage')
  matSelect: MatSelect;

  languages = ['fr', 'en'];

  selectedLanguage = '';


  constructor(private readonly packageJsonService: PackageJsonService,
              private readonly translateService: TranslateService,
              private readonly authService: AuthService) {

    this.selectedLanguage = this.translateService.currentLang;

  }

  ngOnInit(): void {
  }

  public get connected(): boolean {
    return this.authService.isAuthenticated();
  }

  logOut(): void{
    this.authService.logOut();
  }


  public get infos(): PackageJsonInfos {
    return this.packageJsonService.infos;
  }

  closeTimeOut(): void {
    setTimeout(() => {
      this.matMenu.closeMenu();
    }, 10000);
  }

  chooseLanguage(evt): void {
    this.translateService.use(this.selectedLanguage);
  }

}
