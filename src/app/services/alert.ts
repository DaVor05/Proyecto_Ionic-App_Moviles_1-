import { Injectable } from '@angular/core';
import { alertController } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  async showAlert(header: string, message: string) {
    const alert = await alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async confirmAlert(
    header: string, 
    message: string, 
    functionOk: () => void, 
    cancelText: string = 'Cancelar', 
    confirmText: string = 'Aceptar'
  ) {
    const alert = await alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: cancelText,
          role: 'cancel'
        },
        {
          text: confirmText,
          role: 'confirm',
          handler: () => {
            functionOk();
          }
        }
      ]
    });

    await alert.present();
  }
}