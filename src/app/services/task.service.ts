import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private idCounter = 1;

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(description: string): Task | null {
    if (!description.trim()) {
      return null;
    }
    const task: Task = {
      id: this.idCounter++,
      description: description
    };
    this.tasks.push(task);
    return task;
  }

  removeTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
