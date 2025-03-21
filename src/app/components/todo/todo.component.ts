import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  newTask: string = '';
  tasks: { text: string; completed: boolean }[] = [];
  isDarkMode: boolean = false;

  ngOnInit() {
    this.loadTasks(); // Cargar tareas guardadas en localStorage
    this.loadTheme(); // Cargar el tema guardado en localStorage
  }

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ text: this.newTask, completed: false });
      this.newTask = ''; // Limpiar el input después de agregar
      this.saveTasks(); // Guardar en localStorage
    }
  }

  toggleTask(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasks(); // Guardar cambios en localStorage
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks(); // Guardar cambios en localStorage
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode));
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      this.isDarkMode = JSON.parse(savedTheme);
      document.body.classList.toggle('dark-mode', this.isDarkMode);
    }
  }
}
