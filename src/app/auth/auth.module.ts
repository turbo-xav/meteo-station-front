import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { UnauthenticatedComponent } from './unauthenticated/unauthenticated.component';
import { SharedModule } from '../generic/shared/shared.module';


@NgModule({
  declarations: [LoginComponent, UnauthenticatedComponent],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
