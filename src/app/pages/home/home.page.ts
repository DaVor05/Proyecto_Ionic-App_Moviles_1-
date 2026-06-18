import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, 
  IonInput, IonButton, IonList, IonIcon, IonItemSliding, 
  IonItemOptions, IonItemOption, IonReorderGroup, IonReorder 
} from '@ionic/angular/standalone';
import { Task } from '../../models/task.models';
import { addIcons } from 'ionicons';
import { addCircleOutline, trashOutline } from 'ionicons/icons';
// Importación corregida apuntando a tu clase Alert
import { Alert } from '../../services/alert';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, 
    IonInput, IonButton, IonList, IonIcon, IonItemSliding, 
    IonItemOptions, IonItemOption, IonReorderGroup, IonReorder, 
    FormsModule
  ],
})
export class HomePage {

  newTaskStr: string = '';
  tasks: Task[] = []; 

  constructor(private alertService: Alert) {
    // Registramos los dos iconos que usa la vista
    addIcons({ addCircleOutline, trashOutline });
  }

  async ionViewWillEnter() {
    const localData = localStorage.getItem('my_tasks');
    if (localData) {
      this.tasks = JSON.parse(localData);
    } else {
      this.tasks = [
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
      this.saveToLocalStorage();
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('my_tasks', JSON.stringify(this.tasks));
  }

  addTask() {
    const cleanTitle = this.newTaskStr.trim();

    if (cleanTitle === '') {
      this.alertService.showAlert('Campo Vacío', 'El título de la tarea no puede estar vacío.');
      return;
    }

    const isDuplicate = this.tasks.some(
      (task) => task.titulo.trim().toLowerCase() === cleanTitle.toLowerCase()
    );

    if (isDuplicate) {
      this.alertService.showAlert('Duplicado', '¡Esta tarea ya existe en tu lista!');
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
    this.saveToLocalStorage();
    this.newTaskStr = '';
  }

  confirmDelete(index: number) {
    this.alertService.confirmAlert(
      '¿Eliminar Tarea?',
      `¿Estás seguro de borrar: "${this.tasks[index].titulo}"?`,
      () => this.deleteTask(index)
    );
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveToLocalStorage();
  }

  actualizarPosiciones(event: any) {
    this.tasks = event.detail.complete(this.tasks);
    this.saveToLocalStorage();
  }
}