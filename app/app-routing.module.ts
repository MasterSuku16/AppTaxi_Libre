import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ChatsComponent } from './_pages/account/chats/chats.component';
import { FinishedTripComponent } from './_pages/account/finished-trip/finished-trip.component';
import { HistoryComponent } from './_pages/account/history/history.component';
import { LoginComponent } from './_pages/account/login/login.component';
import { MainComponent } from './_pages/account/main/main.component';
import { PendingTripComponent } from './_pages/account/pending-trip/pending-trip.component';
import { ProgressTripComponent } from './_pages/account/progress-trip/progress-trip.component';
import { RegisterComponent } from './_pages/account/register/register.component';
import { SelectingDestinyComponent } from './_pages/account/selecting-destiny/selecting-destiny.component';
import { SettingComponent } from './_pages/account/setting/setting.component';
import { UserEditComponent } from './_pages/users/user-edit/user-edit.component';
import { UserIndexComponent } from './_pages/users/user-index/user-index.component';
import { NavegationComponent } from './_partials/navegation/navegation.component';
//import { FinishedTripComponent } from './_pages/account/finished-trip/finished-trip.component';


//import { TripComponent } from './_pages/account/trip/trip.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'user-index', component: UserIndexComponent },
  { path: 'user-edit', component: UserEditComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'main', component: MainComponent },
  { path: 'chats', component: ChatsComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'navegation', component: NavegationComponent },
  { path: 'finished-trip', component: FinishedTripComponent },
  { path: 'pending-trip', component: PendingTripComponent },
  { path: 'progress-trip', component: ProgressTripComponent },
  { path: 'select-destiny', component: SelectingDestinyComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
