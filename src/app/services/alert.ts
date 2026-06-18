import { Injectable, inject } from '@angular/core';
// CORRECCIÓN: Usar el AlertController compatible con la versión Standalone de Ionic
import { AlertController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  // Inyección del controlador nativo de Ionic
  private alertCtrl = inject(AlertController);

  constructor() { }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
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
    const alert = await this.alertCtrl.create({
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