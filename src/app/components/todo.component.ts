import { Component } from '../../../node_modules/@angular/core';
import { Location } from '../../../node_modules/@angular/common';
import { TodoService } from '../services/todo.service';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { Todo } from '../models/todo.model';
import { Project } from '../models/project.model';
@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  private id: number;
  public todo: Todo;
  constructor(private projectService: ProjectService,
    private todosService: TodoService, 
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((map) => {
      console.log(map);
      // tslint:disable-next-line:radix
      this.id = parseInt(map.get('id'));
      this.todo = this.todosService.getTodos()[this.id];
    });
  }
}
