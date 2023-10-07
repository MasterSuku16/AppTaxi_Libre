import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../_interfaces/RegisterDTO';
import { Result } from '../_interfaces/result';
import { User } from '../_interfaces/user';

import { BaseUrl, httpOptionsJson } from '../_utilidades/global-data.service';

@Injectable({
  providedIn: 'root'
})
export class AccountServicesService {

  constructor(private http: HttpClient) { }

  public PostLogin(nickname:string, password:string ): string {
    return "texto desde service"+nickname+password;      
  }

  public Login(nickname:string, password:string): Observable<any> {
    console.log(nickname, password);
    return this.http.post<Result>(BaseUrl + 'Authentication/Login?username='+nickname+'&password='+password+'',{}, httpOptionsJson);
  }

  // parte de registr
  public PostRegister(name:string, gmail: string, password:string, file:string): string {
    return "texto desde service de la parte de register"+name+gmail+password+file;    
  }
  
  public Register(newUser:RegisterDTO): Observable<Result>{
    return this.http.post<Result>(BaseUrl + 'Authentication/Register',newUser, httpOptionsJson); 
  }
}
