import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  newTaskDescription: string = '';
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  onAddTask(): void {
    if (this.newTaskDescription.trim()) {
      const task = this.taskService.addTask(this.newTaskDescription);
      if (task) {
        this.newTaskDescription = '';
        this.tasks = this.taskService.getTasks();
      }
    }
  }

  onRemoveTask(id: number): void {
    this.taskService.removeTask(id);
    this.tasks = this.taskService.getTasks();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onAddTask();
    }
  }
}
