import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/generic/core/service/auth.service';
import { User } from 'src/app/generic/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor( private readonly authService: AuthService ){}

  ngOnInit(): void {
  }

  get user(): User | null {
    return this.authService.infos;
  }

}
