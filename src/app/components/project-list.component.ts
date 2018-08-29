import { Component, OnInit } from '../../../node_modules/@angular/core';
import { Todo } from '../models/todo.model';
import { ProjectService } from '../services/project.service';
import { MatDialog } from '../../../node_modules/@angular/material';
import { NewProjectDialogComponent } from '../dialogs/new-project-dialog.component';
import { Project } from '../models/project.model';

@Component({
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  public sortType     = '';
  public sortReverse  = false;

  title = 'app';
  newProjectName = '';
  projects: Array<Project> = [];

  constructor(private projectService: ProjectService,
  private matDialog: MatDialog) {}

  ngOnInit() {
    this.projects = this.projectService.getProjects();
    this.sortProjects(this.sortType);
  }

  onPush() {
    this.matDialog.open(NewProjectDialogComponent, {
      width: '300px',
      data: new Project('')
    }).afterClosed().subscribe((result: Project) => {
      console.log(result);
      if (result && result.name !== '') {
        this.projects.push(result);
        this.projectService.saveProjects(this.projects);
      }
    });
  }

 
  compName(a: Project, b: Project) {
    return a.name >  b.name ? 1 : -1;
  }

  compNameRev(a: Project, b: Project) {
    return a.name < b.name ? 1 : -1;
  }
 
  sortProjects(sortType: string) {
    if (this.sortType === sortType) {
      this.sortReverse = !this.sortReverse;
    }
    console.log(sortType);
    this.sortType = sortType;
    if(this.sortType === '')
        return;
    if (this.sortReverse) {
        this.projects.sort(this.compName);
    } else {
        this.projects.sort(this.compNameRev);
    }
  }

  saveProjects() {
    this.projectService.saveProjects(this.projects);
    console.log('checkbox was updated');
  }
  deleteProject(projectToRemove: Project) {
    this.projects = this.projects.filter((project) => project !== projectToRemove );
    this.saveProjects();
  }
  editProject(projectToEdit: Project) {
    const index = this.projects.indexOf(projectToEdit);
    this.matDialog.open(NewProjectDialogComponent, {
      width: '300px',
      data: JSON.parse(JSON.stringify(projectToEdit)),
    }).afterClosed().subscribe((result: Project) => {
      console.log(result);
      if (result && result.name !== '') {
        this.projects[index] = result;
        this.saveProjects();
      }
    });
  }
}
