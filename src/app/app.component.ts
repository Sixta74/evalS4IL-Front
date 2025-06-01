import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { HeaderComponent } from './components/header/header.component';
// import { ConnectionFormComponent } from './components/connection-form/connection-form.component';
// import { StudentListComponent } from './components/student/student-list/student-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet], //HeaderComponent, ConnectionFormComponent
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  title = 'evalS4IL';
}
