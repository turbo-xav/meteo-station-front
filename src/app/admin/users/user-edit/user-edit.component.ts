import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/generic/core/service/users.service';
import { User } from 'src/app/generic/interfaces/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  constructor(
    private readonly activateDroute: ActivatedRoute,
    private readonly usersService: UsersService
  ) {}

  ngOnInit(): void {
    const id: number = this.activateDroute.snapshot.params.id;
    if (id !== undefined) {
      this.usersService.user(id).subscribe((user: User) => {
        console.warn(user);
      });
    }
  }
}
