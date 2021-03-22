import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesService } from './courses.service';
import { CoursesComponent } from './courses.component';
import { CourseNotFoundComponent } from './course-not-found/course-not-found.component';
import { CourseDetailsComponent } from './course-details/course-details.component';

@NgModule({
    imports: [
        CommonModule //Módulo de funcionalidade usamos esse. Porque o BrowserModule é somente no arquivo app.module
    ],
    exports: [],
    declarations: [
        CoursesComponent,
        CourseDetailsComponent,
        CourseNotFoundComponent
    ],
    providers: [CoursesService],
})
export class CoursesModule { }
