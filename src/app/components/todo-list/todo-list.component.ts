import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodoDescription: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todos = this.todoService.getTodos();
  }

  addTodo(): void {
    if (!this.newTodoDescription.trim()) {
      return;
    }

    const todo: Todo = {
      id: uuidv4(),
      description: this.newTodoDescription.trim(),
      isComplete: false
    };
    this.todoService.addTodo(todo);
    this.newTodoDescription = '';
    this.loadTodos();
  }

  toggleCompletion(todo: Todo): void {
    const updatedTodo: Todo = {
      ...todo,
      isComplete: !todo.isComplete
    };
    this.todoService.updateTodo(updatedTodo);
    this.loadTodos();
  }

  deleteTodo(id: string): void {
    this.todoService.deleteTodo(id);
    this.loadTodos();
  }
}
