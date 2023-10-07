import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterDTO } from 'src/app/_interfaces/RegisterDTO';
import { User, ValidateUser } from 'src/app/_interfaces/user';
import { AccountServicesService } from 'src/app/_services/account-services.service';
import { GlobalDataService } from 'src/app/_utilidades/global-data.service';
//los trajo de global-service
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { BaseUrl, httpOptionsJson, httpOptionsMultipart } from '../../../_utilidades/global-data.service';
import { Result } from 'src/app/_interfaces/result';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastControllerService } from 'src/app/_utilidades/toast-controller.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent {
  newUser: RegisterDTO = { name: "", password: "", id: "", email: "", profilePicture: "./assets/images/avatar.webp" };

  constructor(private route: ActivatedRoute,
    private _accountService: AccountServicesService,
    private globaldata: ToastControllerService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private router: Router) {
  }

  //------validaciones del registro---------------
  Register() {
    var validacion = ValidateUser(this.newUser)
    if (validacion.error)
      return this.globaldata.presentToast(validacion.message);
      console.log(this.newUser);

     this._accountService.Register(this.newUser)
      .subscribe(result => { 
        this.globaldata.presentToast(result.title, 1)
        this.router.navigate(['/main'])
       });
  }
  //---------sube una archivo-----------------
  uploadFile = (files: FileList | null) => {
    if (files?.length === 0) {
      return;
    }
    this.newUser.profilePicture = '';
    let fileToUpload = <File>files![0];
    console.log(fileToUpload);
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post<Result>(BaseUrl + 'Authentication/UploadProfilePhoto', formData, httpOptionsMultipart)
      .subscribe((response) => {
        this.newUser.profilePicture = <string>response.data;
        //console.log(response);
      });
  };
}






