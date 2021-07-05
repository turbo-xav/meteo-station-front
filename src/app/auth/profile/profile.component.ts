import { Component } from '@angular/core';
import { AuthService } from 'src/app/generic/core/service/auth.service';
import { User } from 'src/app/generic/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(private readonly authService: AuthService) {}

  get user(): User | null {
    return this.authService.infos;
  }
}
