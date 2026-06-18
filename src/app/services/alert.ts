import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Alert {
  constructor() {}

  // Alerta simple de información o error
  async showAlert(header: string, message: string) {
    const alert = document.createElement('ion-alert');
    alert.header = header;
    alert.message = message;
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    return alert.present();
  }

  // Alerta de confirmación con callbacks para el borrado
  async confirmAlert(header: string, message: string, onConfirm: () => void) {
    const alert = document.createElement('ion-alert');
    alert.header = header;
    alert.message = message;
    alert.buttons = [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Eliminar',
        role: 'destructive',
        handler: () => {
          onConfirm();
        }
      }
    ];

    document.body.appendChild(alert);
    return alert.present();
  }
}