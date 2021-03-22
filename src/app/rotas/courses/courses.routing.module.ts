import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { CoursesComponent } from './courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseNotFoundComponent } from './course-not-found/course-not-found.component';

const coursesRoutes: Routes = [
  { path: 'courses', component: CoursesComponent },
  { path: 'course/:id', component: CourseDetailsComponent },
  { path: 'courseNotFound', component: CourseNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(coursesRoutes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
