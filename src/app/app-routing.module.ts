import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomComponent } from './classroom/classroom.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  { path: 'student', component: StudentComponent},
  { path: 'classroom', component: ClassroomComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
