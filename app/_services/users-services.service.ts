import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_interfaces/user';
import { HttpClient } from '@angular/common/http';
import { BaseUrl, httpOptionsJson, httpOptionsText } from '../_utilidades/global-data.service';
import { Result } from '../_interfaces/result';

@Injectable({
  providedIn: 'root'
})

export class UsersServicesService {

  //constructor(private http: HttpClient,) { }

  constructor(private http: HttpClient) { }

  public GetAllUsers(): Observable<any> {
    var url = BaseUrl + "Users/GetAllUsersAsync";
    console.log(url);
    return this.http.get<User[]>(url);
  }

  public GetSingleUser(): Observable<any> {
    var url = BaseUrl + "User/GetSingleUser";
    console.log(url);
    return this.http.get<User>(url);
  }

  public CreateUser(newUser: any): Observable<any> {
    console.log(newUser);
    return this.http.post<Result>(BaseUrl + 'Users/CreateUserAsync', newUser, httpOptionsJson);
  }

  public UpdateUser(newUser: any): Observable<any> {
    return this.http.post<User>(BaseUrl + 'Users/CreateUserAsync', newUser, httpOptionsJson)
  }
  public Test(): string {
    var url = BaseUrl + "User";
    console.log(url);
    return "HOLA A TODOS";
  }
}
