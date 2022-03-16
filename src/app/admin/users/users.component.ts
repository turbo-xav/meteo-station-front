import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/generic/core/service/users.service';
import { User } from 'src/app/generic/interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  displayedColumns: string[] = [
    'id',
    'firstname',
    'lastname',
    'email',
    'picture',
    'role',
    'action'
  ];

  constructor(private readonly usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.users().subscribe((users: User[]) => {
      this.users = users;
    });
  }
}
