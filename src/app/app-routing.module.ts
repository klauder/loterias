import { AlunosGuard } from './rotas/guards/alunos.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './rotas/home/home.component';
import { LoginComponent } from './rotas/login/login.component';
import { CoursesGuard } from './rotas/guards/courses.guard';
import { AuthGuard } from './rotas/guards/auth.guard';
//import { CoursesComponent } from './rotas/courses/courses.component';
//import { CourseDetailsComponent } from './rotas/courses/course-details/course-details.component';
//import { CourseNotFoundComponent } from './rotas/courses/course-not-found/course-not-found.component';

const appRoutes: Routes = [
  { 
    path: 'courses', 
    loadChildren: () => import('./rotas/courses/courses.module').then(m => m.CoursesModule),
    canActivate: [AuthGuard],
    canActivateChild: [CoursesGuard]
  },
  { 
    path: 'alunos', 
    loadChildren: () => import('./rotas/alunos/alunos.module').then(m => m.AlunosModule),
    canActivate: [AuthGuard],
    //canActivateChild: [AlunosGuard] //Vai estar no módulo de alunos
  },
  //{ path: 'courses', component: CoursesComponent },
  //{ path: 'course/:id', component: CourseDetailsComponent },
  //{ path: 'courseNotFound', component: CourseNotFoundComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: '', 
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
