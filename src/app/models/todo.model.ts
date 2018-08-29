import { Project } from "./project.model";
export class Todo {
  public name: String;
  public isDone: boolean;
  public dueDate: Date;
  public description: String;
  public priority: String;
  public project: Project;
  public projectId: number;
  constructor(
    name: String = '',
    isDone: boolean = false,
    dueDate: Date = new Date,
    description: String = '',
    priority: String = 'Low',
    project: Project = null,
  ) {
    this.name = name;
    this.isDone = isDone;
    this.dueDate = dueDate;
    this.description = description;
    this.priority = priority;
    this.project = project;
  }
};
