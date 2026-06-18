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
import { AlertService } from '../../services/alert';

import { Preferences } from '@capacitor/preferences';

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

  constructor(private alertService: AlertService) {
    addIcons({ addCircleOutline, trashOutline });
  }

  async ionViewWillEnter() {
    const { value } = await Preferences.get({ key: 'my_tasks' });
    
    if (value) {
      this.tasks = JSON.parse(value);
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
      await this.saveToLocalStorage();
    }
  }

  async saveToLocalStorage() {
    await Preferences.set({
      key: 'my_tasks',
      value: JSON.stringify(this.tasks)
    });
  }

  async addTask() {
    const cleanTitle = this.newTaskStr.trim();

    if (cleanTitle === '') {
      this.alertService.showAlert('Campo Vacío', 'El título de la tarea no puede estar vacío.');
      return;
    }

    const isDuplicate = this.tasks.some(
      (task) => task.titulo.trim().toLowerCase() === cleanTitle.toLowerCase()
    );

    if (isDuplicate) {
      this.alertService.showAlert('Duplicado', '¡Esta tarea ya existe in tu lista!');
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
    await this.saveToLocalStorage();
    this.newTaskStr = '';
  }

  confirmDelete(task: any) {
    const index = this.tasks.findIndex(t => t.id === task.id || t.titulo === task.titulo);

    if (index !== -1) {
      // CORREGIDO: Se pasan los parámetros en el orden exacto de alert.ts
      // 1. Header, 2. Mensaje, 3. Función OK, 4. Texto cancelar, 5. Texto confirmar
      this.alertService.confirmAlert(
        'Aviso',
        `¿Desea borrar la tarea "${task.titulo}"?`,
        () => this.deleteTask(index),
        'NO',
        'SI'
      );
    }
  }

  async deleteTask(index: number) {
    this.tasks.splice(index, 1);
    await this.saveToLocalStorage();
  }

  async actualizarPosiciones(event: any) {
    this.tasks = event.detail.complete(this.tasks);
    await this.saveToLocalStorage();
  }
}