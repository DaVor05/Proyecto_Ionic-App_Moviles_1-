import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonList } from '@ionic/angular/standalone';
import { Task } from '../models/task.models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonList, FormsModule],
})

export class HomePage {

  newTaskStr: string = '';

  tasks: Task[] = [
    {
      id: 1, 
      titulo: 'Configuracion de Ionic',
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
    },
  ];

  constructor() {
    console.log(this.tasks);
  }

  addTask() {
    console.log(this.newTaskStr);
    const newTask: Task = {
      id: Date.now(),
      titulo: this.newTaskStr,
      descripcion: '',
      finalizado: false,
      prioridad: 'Media'
    };
    this.tasks.push(newTask);
    console.log(this.tasks);
  }
}