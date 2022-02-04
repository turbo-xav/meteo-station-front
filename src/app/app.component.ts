import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('main', { static: false }) main?: ElementRef;

  constructor(
    private readonly translateService: TranslateService,
    private readonly renderer: Renderer2
  ) {
    this.translateService.use('fr');
  }
}
