import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { GlobalDataService } from 'src/app/_utilidades/global-data.service';
import { ToastControllerService } from 'src/app/_utilidades/toast-controller.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})

export class MainComponent {
  constructor(private toast_control:ToastControllerService,private router:Router) { }
  RegisterDTO = { profilePicture: "./assets/images/avatar.webp" };

  RequestTrip() {
    if (GlobalDataService.current_trip.origin.description == "")
      return this.toast_control.presentToast("ingrese una ubicacion");
    this.router.navigate(['/select-destiny'])
  }
}



