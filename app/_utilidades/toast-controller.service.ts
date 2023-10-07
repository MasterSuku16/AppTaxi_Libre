import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastControllerService {

  constructor(private toastCtrl: ToastController) { }
  
  async presentToast(toast_text: string, seconds: number = 2) {
    const toast = await this.toastCtrl.create({
      message: toast_text,
      duration: seconds * 1000,
      position: 'top'
    });
    toast.present();
  }
}
