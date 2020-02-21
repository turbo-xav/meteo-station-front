import { NgModule } from '@angular/core';

import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { UnauthenticatedComponent } from './auth/unauthenticated/unauthenticated.component';


@NgModule({
  declarations: [HomeComponent,
    LoginComponent,
    LogoutComponent,
    UnauthenticatedComponent],
  imports: [
    SharedModule,
    PublicRoutingModule
  ],
  exports: [
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    UnauthenticatedComponent]
})
export class PublicModule { }
