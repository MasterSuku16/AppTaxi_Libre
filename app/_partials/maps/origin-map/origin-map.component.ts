import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, CUSTOM_ELEMENTS_SCHEMA,NgModule} from '@angular/core';
//---------------importaciones de google maps----------------------
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
//------------------ geolocalizacion--------------------
import { Geolocation, GeolocationOptions } from '@awesome-cordova-plugins/geolocation/ngx';
import { GlobalDataService } from 'src/app/_utilidades/global-data.service';
import { Router } from '@angular/router';
declare var google: any;

@Component({
  selector: 'app-origin-map',
  templateUrl: './origin-map.component.html',
  styleUrls: ['./origin-map.component.scss'],
})
export class OriginMapComponent {

  @Input()
  es_destino:boolean=false;
  @Output() changeDataMap = new EventEmitter<string>();


  map: GoogleMap;
  options: GeolocationOptions;
  triggerUpdateOfPredictions: boolean = true;
  public search: string = '';
  private googleAutocomplete = new google.maps.places.AutocompleteService();
  public searchResults = new Array<any>();
  mapElement: any;
  data_geolocalisation: any;

  constructor(private router: Router,
    public geolocation: Geolocation,
    private globaldata: GlobalDataService) {
  }

  @ViewChild('mapRef')
  set mapRef(ref: ElementRef<HTMLElement>) {
    setTimeout(() => {
      this.createMap(ref.nativeElement);
    }, 500);
  }


  async createMap(ref: HTMLElement) {
    this.map = await GoogleMap.create({
      id: 'maps'+Math.random(),
      apiKey: environment.mapsKey,
      element: ref,
      config: {
        center: {
          lat:this.es_destino?GlobalDataService.current_trip.destiny.lat:GlobalDataService.current_trip.origin.lat,
          lng: this.es_destino?GlobalDataService.current_trip.destiny.lng:GlobalDataService.current_trip.origin.lng,
        },
        zoom:this.es_destino?GlobalDataService.current_trip.destiny.zoom:GlobalDataService.current_trip.origin.zoom
      },
    });
    this.map.enableCurrentLocation(true);
    this.map.setOnCameraIdleListener((cam)=>{
        console.log(cam);
        if(this.es_destino){
          GlobalDataService.current_trip.destiny.lng=cam.longitude;
          GlobalDataService.current_trip.destiny.lat=cam.latitude;
        }else{
          GlobalDataService.current_trip.origin.lng=cam.longitude;
          GlobalDataService.current_trip.origin.lat=cam.latitude;
        }
        var latlng = new google.maps.LatLng(
          this.es_destino?GlobalDataService.current_trip.destiny.lat:GlobalDataService.current_trip.origin.lat,
          this.es_destino?GlobalDataService.current_trip.destiny.lng:GlobalDataService.current_trip.origin.lng);
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ latLng: latlng }, (results, status) => {
          if (status !== "OK" && results) {
            window.alert("Geocoder failed due to: " + status);
            return;
          }
          this.triggerUpdateOfPredictions=false;
          this.search=results[0].formatted_address;
          if(this.es_destino)
            GlobalDataService.current_trip.origin.description=this.search;
          else
            GlobalDataService.current_trip.destiny.description=this.search;
          this.update_ubication();
        });
        
    
  });
  }
  SearchChanged() {
    if (!this.search.length) return;
    if (!this.triggerUpdateOfPredictions)
      return this.triggerUpdateOfPredictions = true;
    this.googleAutocomplete.getPlacePredictions({ input: this.search }, predictions => {
      this.searchResults = predictions;
    })
  }
  SelectSearchResult(item) {
    this.triggerUpdateOfPredictions = false;
    this.search = item.description;
    if(this.es_destino){
      GlobalDataService.current_trip.destiny.google_id=item.placeid;
      GlobalDataService.current_trip.destiny.description=this.search;
      GlobalDataService.current_trip.destiny.google_id = item.place_id;
      GlobalDataService.current_trip.destiny.description = this.search;
    }else{
      GlobalDataService.current_trip.origin.google_id=item.placeid;
      GlobalDataService.current_trip.origin.description=this.search;
      GlobalDataService.current_trip.origin.google_id = item.place_id;
      GlobalDataService.current_trip.origin.description = this.search;
    }

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ placeId: item.place_id }, (results, status) => {
      if (status !== "OK" && results) {
        window.alert("Geocoder failed due to: " + status);
        return;
      }
      this.data_geolocalisation = results[0];
      var camera_settings = {
        coordinate: {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        },
        zoom: 17
      };
      this.map.setCamera(camera_settings);
      this.update_ubication();
    });
    this.searchResults = [];
  }


  update_ubication() {
    console.log("update_ubication"+(this.es_destino?"EN DESTINO":"EN ORIGEN"));
    this.changeDataMap.emit('changeDataMap');
  }


  CalculateRoute() { }
}
