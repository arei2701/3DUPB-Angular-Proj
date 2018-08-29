import { Component } from '../../../node_modules/@angular/core';
import { TodoService } from '../services/todo.service';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { Todo } from '../models/todo.model';
import { Project } from '../models/project.model';
@Component({
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  private id: number;
  public project: Project;
  public tasks: Array<Todo> = new Array<Todo>();
  public tasksIds: Array<number> = new Array<number>();
  constructor(private todoService: TodoService,private projectService: ProjectService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((map) => {
      // tslint:disable-next-line:radix
      this.id = parseInt(map.get('id'));
      this.project = this.projectService.getProjects()[this.id];
      const todos = this.todoService.getTodos();
      var i = 0;
      todos.forEach(element => {
        if(element.project && 
          element.project.name == this.project.name){
          this.tasks.push(element);
          this.tasksIds.push(i);
        }
        i++;
      });
    });
  }
}
