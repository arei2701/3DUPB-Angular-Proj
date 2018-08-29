import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule, MatToolbarModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '../../node_modules/@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { TodoService } from './services/todo.service';
import { ProjectService } from './services/project.service';
import {MatDialogModule} from '@angular/material/dialog';
import {RouterModule, Route } from '@angular/router';
import { NewTodoDialogComponent } from './dialogs/new-todo-dialog.component';
import { TodoComponent } from './components/todo.component';
import { ProjectComponent } from './components/project.component';
import { TodoListComponent } from './components/todo-list.component';
import { NewProjectDialogComponent } from './dialogs/new-project-dialog.component';
import { ProjectListComponent } from './components/project-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatRippleModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

const routes: Array<Route> = [
  {path: 'todo/:id', component: TodoComponent},
  {path: 'todo', component: TodoListComponent},
  {path: 'project/:id', component: ProjectComponent},
  {path: 'project', component: ProjectListComponent},
  {path: '**', redirectTo: 'project'},
  {path: '', component: NewProjectDialogComponent},
  {path: '', component: NewTodoDialogComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NewTodoDialogComponent,
    TodoComponent,
    ProjectComponent,
    TodoListComponent,
    NewProjectDialogComponent,
    ProjectListComponent
  ],
  imports: [
    MatSelectModule,
    BrowserModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatRippleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ TodoService, ProjectService ],
  bootstrap: [AppComponent],
  
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
