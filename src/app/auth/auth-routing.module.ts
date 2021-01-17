import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UnauthenticatedComponent } from './unauthenticated/unauthenticated.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'unauthenticated', component: UnauthenticatedComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
