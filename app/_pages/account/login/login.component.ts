import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountServicesService } from 'src/app/_services/account-services.service';
import { GlobalDataService } from 'src/app/_utilidades/global-data.service';
import { ToastControllerService } from 'src/app/_utilidades/toast-controller.service';

@Component({
  
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string ="20203tn019@utez.edu.mx";
  password: string = "Isaac123";

  constructor(private route: ActivatedRoute, 
    private _accountService: AccountServicesService,
    private globaldata:ToastControllerService,
    private router: Router  ) {}
    
  ngOnInit() {
  }

  login() {
    if (this.email == "")
      return this.globaldata.presentToast("El Correo electronico no puede estar vacio")
    if (this.password == "")
      return this.globaldata.presentToast("El password no puede estar vacio")
    this._accountService.Login(this.email, this.password)
      .subscribe(result => {
        this.globaldata.presentToast(result.title, 1),
        this.router.navigate(['/main'])
      });
  }

  // GoToLinkExternal(url: string) {
  //   window.open(url, '_system', 'location=yes');
  // }
}



