import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, MenuComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [HeaderComponent, FooterComponent, MenuComponent]
})
export class  GlobalLayoutModule { }
