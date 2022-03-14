import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/generic/interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [
    {
      id: 1,
      email: 'xavier.tagliarino@gmail.com',
      role: 'ADMIN',
      firstname: 'unkown before connecion',
      lastname: 'he is ADMIN by default',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GimFdnllqH5tW8GrxT0gdvfJQRcCEsmzjyuskBKVY8=s96-c'
    } as User,
    {
      id: 2,
      email: 'tagliarino.xavier@gmail.com',
      role: 'USER',
      firstname: 'unkown before connecion',
      lastname: 'he is USER by default',
      picture:
        'https://lh3.googleusercontent.com/a-/AOh14GimFdnllqH5tW8GrxT0gdvfJQRcCEsmzjyuskBKVY8=s96-c'
    } as User
  ];

  displayedColumns: string[] = [
    'id',
    'firstname',
    'lastname',
    'email',
    'picture',
    'role'
  ];

  constructor() {}

  ngOnInit(): void {}
}
