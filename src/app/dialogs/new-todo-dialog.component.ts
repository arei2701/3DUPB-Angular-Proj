import { Component, Inject } from '../../../node_modules/@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../node_modules/@angular/material';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';
@Component({
  templateUrl: './new-todo-dialog.component.html'
})
export class NewTodoDialogComponent {
  public type: string;
  public newTodo: Todo;
  public projects: Array<Project>;
  constructor(private dialogRef: MatDialogRef<NewTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {projects: Array<Project>,
    todo: Todo}) {
        this.projects = data.projects;
        this.newTodo = data.todo;
      }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
};
