import { Component, Inject } from '../../../node_modules/@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../node_modules/@angular/material';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';
@Component({
  templateUrl: './new-project-dialog.component.html'
})
export class NewProjectDialogComponent {
  public type: string;
  constructor(private dialogRef: MatDialogRef<NewProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public newProject: Project) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
};
