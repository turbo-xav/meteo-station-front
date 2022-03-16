import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/generic/shared/shared.module';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  declarations: [UsersComponent, UserEditComponent],
  imports: [SharedModule, UsersRoutingModule]
})
export class UsersModule {}
