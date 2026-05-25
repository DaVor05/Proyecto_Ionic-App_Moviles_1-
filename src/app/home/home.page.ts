import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Task } from '../models/task.models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})

export class HomePage {
  tasks: Task[]=[
    {
      id: 1, titulo: 'Configuracion de Ionic',
      descripcion: 'Instalar Node.js, Angular CLI e Ionic CLI',
      finalizado: false,
      prioridad: 'Alta'
    }, 
    {
      id: 2,
      titulo: 'Crear app tasklist',
      descripcion: 'Crear proyecto inicial con Ionic CLI',
      finalizado: false,
      prioridad: 'Alta'
    },];

  constructor(){
    console.log(this.tasks);
  }

}
