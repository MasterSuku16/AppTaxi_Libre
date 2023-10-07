import { Component, OnInit, ElementRef, ViewChild, ɵclearResolutionOfComponentResourcesQueue, Input, NgModule,NgZone } from '@angular/core';
import { Router, Routes } from '@angular/router';

//---------------importaciones de google maps----------------------
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
//------------------ geolocalizacion--------------------
import { Geolocation, GeolocationOptions } from '@awesome-cordova-plugins/geolocation/ngx';
import { GlobalDataService } from 'src/app/_utilidades/global-data.service';
import { TouchSequence } from 'selenium-webdriver';
import { vector } from './../../../_interfaces/vector';
import { camera_settings } from './../../../_interfaces/camera_settings';

declare var google: any;

@Component({
  selector: 'app-selecting-destiny',
  templateUrl: './selecting-destiny.component.html',
  styleUrls: ['./selecting-destiny.component.scss'],
})

export class SelectingDestinyComponent  {
  
  public origin_description:string=GlobalDataService.current_trip.origin.description;
  public destiny_description:string=GlobalDataService.current_trip.origin.description;
  public price:number=0;
  public distance_in_km:number=0;
  public price_per_km:number=8;
  public conversion_coordinate_to_km:number=111.320;


  public toogle_editar_origen:boolean=false;
  public toogle_editar_destino:boolean=true;

  constructor(private router: Router, private ngZone:NgZone) {
    console.log(GlobalDataService.current_trip);
  }
  ngOnInit(): void {
  }

  calcultate_trip_price(data) {
    console.log("calcultate_trip_price"+data);
    console.log(GlobalDataService.current_trip);  

    var total_x_distance = GlobalDataService.current_trip.origin.lng - GlobalDataService.current_trip.destiny.lng;
    var total_y_distance = GlobalDataService.current_trip.origin.lat - GlobalDataService.current_trip.destiny.lat;
    var distance_in_degrees=Math.sqrt( total_x_distance*total_x_distance + total_y_distance*total_y_distance );

    this.distance_in_km=Math.round( (distance_in_degrees*this.conversion_coordinate_to_km)*1.8);
    this.price= Math.round(this.distance_in_km*this.price_per_km);
    GlobalDataService.current_trip.price=this.price;
  }

  function_toogle_edicion_origen(){
    this.toogle_editar_origen=!this.toogle_editar_origen;
    this.origin_description=GlobalDataService.current_trip.origin.description;
    this.ngZone.run(() => {
      console.log("anim complete");
    });
  }

  function_toogle_edicion_destino(){
    this.toogle_editar_destino=!this.toogle_editar_destino;
    this.destiny_description=GlobalDataService.current_trip.destiny.description;
    this.ngZone.run(() => {
      console.log("anim complete");
    });
  }
  
  SolicitarViaje(){
    console.log(GlobalDataService.current_trip);

  }

}
