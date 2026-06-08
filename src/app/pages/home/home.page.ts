import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonList, IonAlert, IonIcon } from '@ionic/angular/standalone';
import { Task } from '../../models/task.models';
import {addIcons} from 'ionicons';
import {addOutline, addCircleOutline} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonList, IonAlert, FormsModule, IonIcon ],
})
export class HomePage {

  newTaskStr: string = '';

  isAlertOpen: boolean = false;
  alertMessage: string = '';
  alertButtons: string[] = ['Entendido'];

  tasks: Task[] = [
    {
      id: 1, 
      titulo: 'Configuracion de Ionic Basica',
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
    addIcons({ addCircleOutline });
    console.log(this.tasks);
  }


  //Alerta de Error
  showAlert(message: string) {
    this.alertMessage = message;
    this.isAlertOpen = true;
  }

  addTask() {
    console.log('Valor recibido:', this.newTaskStr);

    //4.Espacios en blanco antes y después.
    const cleanTitle = this.newTaskStr.trim();

    //1.Título: No vacío.
    if (cleanTitle === '') {
      this.showAlert('El título de la tarea no puede estar vacío o contener solo espacios.');
      return;
    }

    //2 y 3.No duplicados & Sensible a mayúsculas y minúsculas.
    const isDuplicate = this.tasks.some(
      (task) => task.titulo.trim().toLowerCase() === cleanTitle.toLowerCase()
    );

    if (isDuplicate) {
      this.showAlert('¡Esta tarea ya existe en tu lista! No se permiten duplicados.');
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      titulo: cleanTitle,
      descripcion: '',
      finalizado: false,
      prioridad: 'Media'
    };

    this.tasks.push(newTask);
    console.log('Lista actualizada:', this.tasks);

    this.newTaskStr = '';
  }
}