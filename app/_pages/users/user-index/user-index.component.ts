import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../_interfaces/user';
import { UsersServicesService } from '../../../_services/users-services.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss'],
})
export class UserIndexComponent implements OnInit {

  ngOnInit() {}

  users: User[] = [];

  constructor(private router: Router, private _userService: UsersServicesService) {
    this._userService.GetAllUsers().subscribe(result => {
      this.users = result;
      console.log(result);
    });
    console.log(this.users);
    this._userService.GetSingleUser().subscribe(result => console.log(result));
    
  }

  GotoDetailsOfUser(user: User) {
    this.router.navigate(['/user/', 'user-edit']);
  }
}
