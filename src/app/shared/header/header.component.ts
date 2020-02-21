import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
                private readonly translate: TranslateService  ,
                private router: Router  ,
                private authService: AuthService
                ) {
  }

  ngOnInit(): void {
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
