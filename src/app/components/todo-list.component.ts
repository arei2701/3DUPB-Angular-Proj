import { Component, OnInit } from '../../../node_modules/@angular/core';
import { Todo } from '../models/todo.model';
import { Project } from '../models/project.model';
import { TodoService } from '../services/todo.service';
import { ProjectService } from '../services/project.service';
import { MatDialog } from '../../../node_modules/@angular/material';
import { NewTodoDialogComponent } from '../dialogs/new-todo-dialog.component';

@Component({
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  public sortType     = 'dueDate';
  public sortReverse  = false;
  public filterType   = 'all';

  title = 'tasks';
  newTaskName = '';
  tasks: Array<Todo> = [];
  tasksToShow: Array<Todo> = [];
  projects: Array<Project> = [];
  constructor(private todoService: TodoService,
  private matDialog: MatDialog,
  private projectSevice: ProjectService) {}


  ngOnInit() {
    this.tasks = this.todoService.getTodos();
    this.tasksToShow = this.tasks;
    this.projects = this.projectSevice.getProjects();
    this.sortTodos(this.sortType);
  }
  deleteTodo(taskToRemove: Todo) {
    this.tasks = this.tasks.filter((task) => task !== taskToRemove );
    this.saveTodos();
  }

  onPush(todo: Todo = null) {
    var index = -1;
    var todoRef = new Todo();
    if(todo){
      index = this.tasks.indexOf(todo);
      todoRef = JSON.parse(JSON.stringify(todo));
    }
    console.log(this.projectSevice.getProjects());
    this.matDialog.open(NewTodoDialogComponent, {
      width: '300px',
      data: {
        todo: todoRef,
        projects:this.projects}
    }).afterClosed().subscribe((result: Todo) => {
      console.log(result);
      if (result && result.name !== '') {
        var i = 0;
        if(result.project){
          this.projects.forEach(element => {
              if(element.name == result.project.name){
               result.projectId = i;
               // break;
             }
              i++;
          });
        }
        if (index === -1) {
          this.tasks.push(result);
          this.todoService.saveTodos(this.tasks);
        } else {
          this.tasks[index] = result;
          this.saveTodos();
        }
      }
    });
  }

  filterTodos(filterType: string, projName: string = '') {
    if (this.filterType === filterType &&
      this.filterType != 'project') {
      return;
    }
    this.filterType = filterType;
    this.tasksToShow = [];
    switch (this.filterType) {
      case('all'):
        this.tasksToShow = this.tasks;
        break;
      case('overdue'):
        this.tasksToShow = this.tasks.filter(this.isTodoOverDue);
        break;
      case('futur'):
        this.tasksToShow = this.tasks.filter(this.isTodoDueInTheFuture);
        break;
      case('today'):
        this.tasksToShow = this.tasks.filter(this.idTodoDueToday);
        break;
      case('project'):
        this.tasksToShow = this.tasks.filter(a =>
          {
            if(a.project && projName!='')
               return a.project.name == projName;
            else if(!a.project && projName=='')
                return true;
            else 
                return false;
          });
        break;
      case('high'):
        this.tasksToShow = this.tasks.filter(a =>
          {
            return a.priority == 'High';
          });
        break;
      case('mid'):
        this.tasksToShow = this.tasks.filter(a =>
          {
            return a.priority == 'Mid';
          });
        break;
      case('low'):
        this.tasksToShow = this.tasks.filter(a =>
          {
            return a.priority == 'Low';
          });;
        break;
    }
    
      
  }
  compName(a: Todo, b: Todo) {
    return a.name >  b.name ? 1 : -1;
  }

  compNameRev(a: Todo, b: Todo) {
    return a.name < b.name ? 1 : -1;
  }
  compDate(a: Todo, b: Todo) {
      return a.dueDate >  b.dueDate ? 1 : -1;
  }
  compDateRev(a: Todo, b: Todo) {
    return a.dueDate < b.dueDate ? 1 : -1;
  }
  compDone(a: Todo, b: Todo) {
    return a.isDone &&  !b.isDone ? 1 : -1;
  }

  compDoneRev(a: Todo, b: Todo) {
    return !a.isDone &&  b.isDone ? 1 : -1;
  }
  
  compPriority(a: Todo, b: Todo) {
    var priorityNr = function(task: Todo){
      var i = -1;
      switch (task.priority) {
        case 'High':
          i = 2;
          break;
        case 'Mid':
          i = 1;
          break;
        case 'Low':
          i = 0;
          break;
        default:
          break;
      }
      return i;
    };
    return priorityNr(a) - priorityNr(b);
  }

  compPriorityRev(a: Todo, b: Todo) {
    var priorityNr = function(task: Todo){
      var i = -1;
      switch (task.priority) {
        case 'High':
          i = 2;
          break;
        case 'Mid':
          i = 1;
          break;
        case 'Low':
          i = 0;
          break;
        default:
          break;
      }
      return i;
    };
    return priorityNr(b) - priorityNr(a);
  }

  sortTodos(sortType: string) {
    if (this.sortType === sortType) {
      this.sortReverse = !this.sortReverse;
    }
    console.log(sortType);
    this.sortType = sortType;
    switch (sortType) {
      case 'name':
        if (this.sortReverse) {
          this.tasksToShow.sort(this.compName);
        } else {
          this.tasksToShow.sort(this.compNameRev);
        }
         break;
      case 'dueDate':
        if (this.sortReverse) {
          this.tasksToShow.sort(this.compDate);
        } else {
          this.tasksToShow.sort(this.compDateRev);
        }
        break;
      case 'done':
        if (this.sortReverse) {
          this.tasksToShow.sort(this.compDone);
        } else {
          this.tasksToShow.sort(this.compDoneRev);
        }
        break;
      case 'priority':
        if (this.sortReverse) {
          this.tasksToShow.sort(this.compPriority);
        } else {
          this.tasksToShow.sort(this.compPriorityRev);
        }
        break;
      
    }
  }

  saveTodos() {
    this.todoService.saveTodos(this.tasks);
    console.log('checkbox was updated');
  }
 
  isTodoOverDue(todo: Todo) {
    const dueDate = new Date(todo.dueDate);
    const today = new Date();
    return dueDate.getFullYear() < today.getFullYear() ||
    dueDate.getMonth() < today.getMonth() ||
    dueDate.getDate() < today.getDate();
  }
  idTodoDueToday(a: Todo) {
    const dueDate = new Date(a.dueDate);
    const today = new Date();
    return dueDate.getFullYear() === today.getFullYear() &&
    dueDate.getMonth() === today.getMonth() &&
    dueDate.getDate() === today.getDate();
  }
  isTodoDueInTheFuture(a: Todo) {
    const dueDate = new Date(a.dueDate);
    const today = new Date();
    return today.getFullYear() < dueDate.getFullYear() &&
    today.getMonth() < dueDate.getMonth() &&
    today.getDay() < dueDate.getDay();
  }
}
