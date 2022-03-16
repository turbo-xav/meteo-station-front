import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/generic/core/service/users.service';
import { User } from 'src/app/generic/interfaces/user';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user?: User;

  userEditForm: FormGroup;

  constructor(
    private readonly activateDroute: ActivatedRoute,
    private readonly router: Router,
    private readonly usersService: UsersService,
    private readonly fb: FormBuilder
  ) {
    this.userEditForm = this.fb.group({
      id: [''],
      firstname: [''],
      lastname: [''],
      email: [''],
      picture: [''],
      role: ['']
    });
  }

  ngOnInit(): void {
    const id: number = this.activateDroute.snapshot.params.id;

    if (id !== undefined) {
      this.usersService.user(id).subscribe(
        (user?: User) => {
          this.user = user;
          this.userEditForm.patchValue({
            id: user?.id,
            firstname: user?.firstname,
            lastname: user?.lastname,
            email: user?.email,
            picture: user?.picture,
            role: user?.role
          });
        },
        () => {
          void this.router.navigateByUrl('/admin/users');
        }
      );
    }
  }

  save(): void {
    this.usersService
      .save(this.userEditForm.getRawValue() as User)
      .subscribe(() => {
        void this.router.navigateByUrl('/admin/users');
      });
  }
}
