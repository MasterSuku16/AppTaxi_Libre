import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { camera_settings } from '../_interfaces/camera_settings';
import { trip_data } from '../_interfaces/trip_data';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { User } from '../_interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class GlobalDataService {
  static current_trip: trip_data = {
    bitacora: [],
    destiny: { lng: 0, lat: 0, description: "", google_id: "", zoom: 17 },
    origin: { lng: 0, lat: 0, description: "", google_id: "", zoom: 17 },
    price: 0,
    usuario_conductor: undefined,
    usuario_viajero: undefined
  };

  static current_user:User;

  constructor(private toastCtrl: ToastController,private geolocation: Geolocation) {
      this.geolocation.getCurrentPosition().then((resp) => {
        GlobalDataService.current_trip.origin.lng=resp.coords.longitude;
        GlobalDataService.current_trip.origin.lat=resp.coords.latitude;
      }).catch((error) => {
        console.log('Error getting location', error);
      });
  }

  GoToLinkExternal(url: string) {
    window.open(url, '_system', 'location=yes');
  }
}

export const BaseUrl: string = "https://localhost:7284/";

export const httpOptionsJson = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

export const httpOptionsText = {
  headers: new HttpHeaders({
    'Content-type': 'application/text',
    Authorization: 'my-auth-token'
  })
};

export const httpOptionsMultipart = {
  headers: new HttpHeaders({
    Authorization: 'my-auth-token'
  })
};




