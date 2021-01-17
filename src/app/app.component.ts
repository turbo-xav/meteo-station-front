import { Component, ElementRef, ViewChild, AfterViewInit, AfterContentChecked } from '@angular/core';
import {ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  @ViewChild('main', { static: false }) main?: ElementRef;

  updateHeight(height: number): void{
    if (this.main) {
      this.main.nativeElement.style.marginBottom = (height + 5 ) + 'px';
    }
  }

  constructor( private readonly translateService: TranslateService) {
    this.translateService.use('fr');
  }


}
