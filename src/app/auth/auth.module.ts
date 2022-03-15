import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../generic/shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
  declarations: [LoginComponent, ProfileComponent, UnauthorizedComponent],
  imports: [SharedModule, AuthRoutingModule]
})
export class AuthModule {}
