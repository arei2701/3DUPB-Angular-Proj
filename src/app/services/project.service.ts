import { Injectable } from '../../../node_modules/@angular/core';
import { Project } from '../models/project.model';

@Injectable()
export class ProjectService {

  public getProjects(): Array<Project> {
    const val = localStorage.getItem('projects');
    let projects = JSON.parse(val);
    if (projects === null) {
        projects = new Array<Project>();
    }
    return projects;
  }

  public saveProjects( newProjects: Array<Project> ) {
    localStorage.setItem('projects', JSON.stringify(newProjects));
  }

}
