import { Component, OnInit, ElementRef, ViewChild, ɵclearResolutionOfComponentResourcesQueue, Input, NgModule } from '@angular/core';
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
//import { Geoposition } from '@awesome-cordova-plugins/geolocation';

declare var google: any;
//var mapa001 = localStorage.getItem('Coordenadas');

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OriginMapComponent } from 'src/app/_partials/maps/origin-map/origin-map.component';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
  
  //schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class TripPage {
  map: GoogleMap;
  map2: GoogleMap;
  options: GeolocationOptions;
 
  //------------redireccionar la id de las coordenadas----------
  placeid: any;
  countryCode: string = "";
  countryName: string = "";
  state: string = "";
  city: string = "";
  triggerUpdateOfPredictionsOrigin: boolean = false;
  triggerUpdateOfPredictionsDestinity: boolean = true;

  toogle_editar_origen:boolean;

  price:number=0;
  distance_in_km:number=0;
  price_per_km:number=8;
  conversion_coordinate_to_km:number=111.320;
  
  public searchOrigin = GlobalDataService.current_trip.origin.description;
  public searchDestinity: string = '';
  private googleAutocomplete = new google.maps.places.AutocompleteService();
  public searchResultsOrigin = new Array<any>();
  public searchResultsDestinity = new Array<any>();
  mapElement: any

  constructor(private router: Router, public geolocation: Geolocation) {
    console.log(GlobalDataService.current_trip);
    this.searchOrigin = GlobalDataService.current_trip.origin.description;
  }

  //----------------------VISUALIZA EL MAPA DE ORIGEN----------------------------
  @ViewChild('mapRefOrigin')
  set mapRefOrigin(ref: ElementRef<HTMLElement>) {
    setTimeout(() => {
      this.createMap(ref.nativeElement);
    }, 500);
  }
  async createMap(ref: HTMLElement) {
  
    this.map = await GoogleMap.create({
      id: 'maps1',
      apiKey: environment.mapsKey,
      element: ref,
      
      config: {
        center: {
          // The initial position to be rendered by the map 
          lat: GlobalDataService.current_trip.origin.lat,
          lng: GlobalDataService.current_trip.origin.lng,
        },
        zoom: GlobalDataService.current_trip.origin.zoom, // The initial zoom level to be rendered by the map
      },
      //forceCreate: true
    })
    this.map.enableCurrentLocation(true);

  
    // this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    //   center: { lat: -34.397, lng: 150.644 },
    //   zoom: 8,
    // });

    this.map.setOnCameraIdleListener(()=>{
        console.log("CAMERA IDLE")

  //      this.origin_vector.x=this.map.;
      //  this.origin_vector.y=GlobalDataService.camera_settings_origin.coordinate.lat;
    });

    //this.origin_vector = new vector(){ x };
    //this.origin_vector.x=GlobalDataService.camera_settings_origin.coordinate.lng;
    //this.origin_vector.y=GlobalDataService.camera_settings_origin.coordinate.lat;
  }


  SearchChangedOrigin() {

    if (!this.searchOrigin.length) return;
    if (!this.triggerUpdateOfPredictionsOrigin)
      return this.triggerUpdateOfPredictionsOrigin = true;
    this.googleAutocomplete.getPlacePredictions({ input: this.searchOrigin }, predictions => {
      this.searchResultsOrigin = predictions;
    })

  }
  //------------------------VISUALIZA EL MAPA DE DESTINO------------------------
  @ViewChild('mapRefDestinity')
  set mapRefDestinity(ref: ElementRef<HTMLElement>) {
    setTimeout(() => {
      this.createMap2(ref.nativeElement);
    }, 500);
  }
  async createMap2(ref: HTMLElement) {
    this.map2 = await GoogleMap.create({
      id: 'maps2',
      apiKey: environment.mapsKey,
      element: ref,
      config: {
        center: {
          // The initial position to be rendered by the map 
          lat: GlobalDataService.current_trip.origin.lat,
          lng: GlobalDataService.current_trip.origin.lng,
        },
        zoom: 9.5, // The initial zoom level to be rendered by the map
      },
      //forceCreate: true
    })
  }

  //busca la direccion ingresada
  SearchChangedDestinity() {
    if (!this.searchDestinity.length) return;
    if (!this.triggerUpdateOfPredictionsDestinity)
      return this.triggerUpdateOfPredictionsDestinity = true;
    this.googleAutocomplete.getPlacePredictions({ input: this.searchDestinity }, predictions => {
      //console.log(predictions);
      this.searchResultsDestinity = predictions;
    })
  }

  //seleccion de la direccion de la lista
  SelectSearchResultDestinity(itemDestinity) {
    this.triggerUpdateOfPredictionsDestinity = false;
    this.placeid = itemDestinity.place_id
    this.searchDestinity = itemDestinity.description;
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ placeId: itemDestinity.place_id }, (results2, status) => {
      if (status !== "OK" && results2) {
        window.alert("Geocoder failed due to: " + status);
        return;
      }
      //console.log(results2[0]);
      for (var i in results2[0].address_components) {
        //console.log(results[0].address_components[i].types[0]+"Indice"+i)
        if (results2[0].address_components[i].types[0] === "locality")
          this.city = results2[0].address_components[i].long_name

        if (results2[0].address_components[i].types[0] === "administrative_area_level_1")
          this.state = results2[0].address_components[i].long_name

        if (results2[0].address_components[i].types[0] === "country") {
          this.countryCode = results2[0].address_components[i].short_name
          this.countryName = results2[0].address_components[i].long_name
          break;
        }
      }
      
      GlobalDataService.current_trip.destiny.lng=results2[0].geometry.location.lng();
      GlobalDataService.current_trip.destiny.lat=results2[0].geometry.location.lat();
      //Mover a la direccion ingresada
      this.map2.setCamera({
        coordinate: {
          lat: GlobalDataService.current_trip.destiny.lat,
          lng: GlobalDataService.current_trip.destiny.lng
        },
        zoom: 17
      });
      
      this.calcultate_trip_price();
    });
    //Se cierra la lista al elegir un resultado
    this.searchResultsDestinity = [];
  }

  SelectSearchResultOrigin(itemOrigin) {
    this.triggerUpdateOfPredictionsOrigin = false;
    this.placeid = itemOrigin.place_id
    this.searchOrigin = itemOrigin.description;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ placeId: itemOrigin.place_id }, (results2, status) => {
      if (status !== "OK" && results2) {
        window.alert("Geocoder failed due to: " + status);
        return;
      }
      for (var i in results2[0].address_components) {
        if (results2[0].address_components[i].types[0] === "locality")
          this.city = results2[0].address_components[i].long_name
        if (results2[0].address_components[i].types[0] === "administrative_area_level_1")
          this.state = results2[0].address_components[i].long_name
        if (results2[0].address_components[i].types[0] === "country") {
          this.countryCode = results2[0].address_components[i].short_name
          this.countryName = results2[0].address_components[i].long_name
          break;
        }
      }
      //Mover a la direccion ingresada
      this.map.setCamera({
        coordinate: {
          lat: results2[0].geometry.location.lat(),
          lng: results2[0].geometry.location.lng()
        },
        zoom: 17
      });
      GlobalDataService.current_trip.destiny.lng=results2[0].geometry.location.lng();
      GlobalDataService.current_trip.destiny.lat=results2[0].geometry.location.lat();
    //  this.destiny_vector.x=results2[0].geometry.location.lng();
     // this.destiny_vector.y=results2[0].geometry.location.lat();
      this.calcultate_trip_price();
    });
    //Se cierra la lista al elegir un resultado
    this.searchResultsOrigin = [];
  }

  calcultate_trip_price() {
    var total_x_distance = GlobalDataService.current_trip.origin.lng - GlobalDataService.current_trip.destiny.lng;
    var total_y_distance = GlobalDataService.current_trip.origin.lat - GlobalDataService.current_trip.destiny.lat;
    var distance_in_degrees=Math.sqrt( total_x_distance*total_x_distance + total_y_distance*total_y_distance );

    this.distance_in_km=Math.round( (distance_in_degrees*this.conversion_coordinate_to_km)*1.8);
    this.price= Math.round(this.distance_in_km*this.price_per_km);
  }

  function_toogle_edicion_origen(){
    this.toogle_editar_origen=!this.toogle_editar_origen;
  }


}
