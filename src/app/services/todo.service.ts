import { Injectable } from '../../../node_modules/@angular/core';
import { Todo } from '../models/todo.model';

@Injectable()
export class TodoService {

  public getTodos(): Array<Todo> {
    const val = localStorage.getItem('todos');
    let tasks = JSON.parse(val);
    if (tasks === null) {
      tasks = new Array<Todo>();
    }
    return tasks;
  }

  public saveTodos( newTodos: Array<Todo> ) {
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }

}
