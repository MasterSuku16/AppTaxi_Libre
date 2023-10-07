import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alert } from 'selenium-webdriver';
import { User } from '../../../_interfaces/user';
import { UsersServicesService } from '../../../_services/users-services.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent  {

  user: User = { name:"TEST"} as User;

  constructor(private route: ActivatedRoute, private _userService:UsersServicesService) {
    this.route.params.subscribe(params => {
      //if (params['id'] != "")
      //  _userService.GetSingleUser(params['id'])
      //    .subscribe(result => this.user = result);
    });
  }

  SaveUser() {
    console.log(this.user);
    if (this.user.id == "" || this.user.id == undefined)
      this._userService.CreateUser(this.user).subscribe(result => {
        console.log(result);
        this.user.id = result.data;
      });
    else
      this._userService.UpdateUser(this.user).subscribe(data => this.user.id = data);
  }
}
