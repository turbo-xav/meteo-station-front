import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('main', { static: false }) main?: ElementRef;

  updateHeight(height: number): void {
    if (this.main !== undefined) {
      this.main.nativeElement.style.marginBottom = (height + 5) + 'px';
    }
  }

  constructor(private readonly translateService: TranslateService) {
    this.translateService.use('fr');
  }

  ngOnInit(): void {
  }


}
