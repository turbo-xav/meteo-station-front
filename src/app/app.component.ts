import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('main', { static: false }) main?: ElementRef;

  updateHeight(height: number): void {
    this.renderer.setStyle(
      this.main?.nativeElement,
      'marginBottom',
      String(height + 5) + 'px'
    );
  }

  constructor(
    private readonly translateService: TranslateService,
    private readonly renderer: Renderer2
  ) {
    this.translateService.use('fr');
  }
}
