import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { TranslateService } from '@ngx-translate/core';
import {
  PackageJsonService,
  PackageJsonInfos
} from '../../core/service/package-json.service';
import { ViewEncapsulation } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { AuthService } from 'src/app/generic/core/service/auth.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent {
  @ViewChild('menuTrigger')
  matMenu?: MatMenuTrigger;

  @ViewChild('matSelectLanguage')
  matSelect?: MatSelect;

  languages = ['fr', 'en'];

  selectedLanguage = 'fr';

  constructor(
    private readonly packageJsonService: PackageJsonService,
    private readonly translateService: TranslateService,
    private readonly authService: AuthService
  ) {
    this.selectedLanguage = this.translateService.currentLang;
  }

  get authUrl(): string {
    return this.authService.apiAuthUrl;
  }

  get user(): User | null {
    return this.authService.infos;
  }

  public get connected(): boolean {
    return this.authService.isAuthenticated();
  }

  logOut(): void {
    this.authService.logOut();
  }

  public get infos(): PackageJsonInfos {
    return this.packageJsonService.infos;
  }

  closeTimeOut(): void {
    setTimeout(() => {
      if (this.matMenu) {
        this.matMenu.closeMenu();
      }
    }, 10000);
  }

  chooseLanguage(): void {
    this.translateService.use(this.selectedLanguage);
  }
}
