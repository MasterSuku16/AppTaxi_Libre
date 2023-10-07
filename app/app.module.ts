import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserIndexComponent } from './_pages/users/user-index/user-index.component';
import { UserEditComponent } from './_pages/users/user-edit/user-edit.component';
import { LoginComponent } from './_pages/account/login/login.component';
import { RegisterComponent } from './_pages/account/register/register.component';
import { NavegationComponent } from './_partials/navegation/navegation.component';
import { MainComponent } from './_pages/account/main/main.component';
//
import { ProgressTripComponent } from './_pages/account/progress-trip/progress-trip.component';
import { FinishedTripComponent } from './_pages/account/finished-trip/finished-trip.component';
import { PendingTripComponent } from './_pages/account/pending-trip/pending-trip.component';


//empieza la navegacion entre pantallas del TAB-NAV
import { ChatsComponent } from './_pages/account/chats/chats.component';
import { HistoryComponent } from './_pages/account/history/history.component'
import { SettingComponent } from './_pages/account/setting/setting.component'
//para subir archivos
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
//IMPORTAMOS GEOLOCALIZACION Y GEOCODER
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { OriginMapComponent } from './_partials/maps/origin-map/origin-map.component';
import { SelectingDestinyComponent } from './_pages/account/selecting-destiny/selecting-destiny.component';

@NgModule({
  declarations: [
    AppComponent,UserIndexComponent,UserEditComponent,LoginComponent, RegisterComponent,
    NavegationComponent, MainComponent, ChatsComponent, HistoryComponent,SettingComponent,
    SelectingDestinyComponent,
    ProgressTripComponent, FinishedTripComponent, PendingTripComponent,OriginMapComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule], 
  providers: [ FileTransfer, Geolocation,  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {}
