import { AlunosGuard } from './rotas/guards/alunos.guard';
import { CoursesGuard } from './rotas/guards/courses.guard';
import { AuthGuard } from './rotas/guards/auth.guard';
import { AuthService } from './rotas/login/auth.service';
import { LogService } from './shared/log.service';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataBindingComponent } from './data-binding/data-binding.component';
import { MeuFormComponent } from './meu-form/meu-form.component';
import { MeuFormModule } from './meu-form/meu-form.module';
import { InputPropertyComponent } from './input-property/input-property.component';
import { OutputPropertyComponent } from './output-property/output-property.component';
import { CicloComponent } from './ciclo/ciclo.component';
import { DiretivaNgifComponent } from './diretiva-ngif/diretiva-ngif.component';
import { DiretivaNgswitchComponent } from './diretiva-ngswitch/diretiva-ngswitch.component';
import { DiretivaNgforComponent } from './diretiva-ngfor/diretiva-ngfor.component';
import { DiretivaNgclassComponent } from './diretiva-ngclass/diretiva-ngclass.component';
import { DiretivaNgstyleComponent } from './diretiva-ngstyle/diretiva-ngstyle.component';
import { OperadorElvisComponent } from './operador-elvis/operador-elvis.component';
import { ExemploNgContentComponent } from './exemplo-ng-content/exemplo-ng-content.component';
import { FundoAmareloDirective } from './shared/fundo-amarelo.directive';
import { DiretivasCustomizadasComponent } from './diretivas-customizadas/diretivas-customizadas.component';
import { HighlightMouseDirective } from './shared/highlight-mouse.directive';
import { HighlightDirective } from './shared/highlight.directive';
import { NgElseDirective } from './shared/ng-else.directive';
import { CursosComponent } from './servicos/cursos/cursos.component';
import { CursosService } from './servicos/cursos/cursos.service';
//import { CriarCursoComponent } from './servicos/criar-curso/criar-curso.component';
import { CriarCursoModule } from './servicos/criar-curso/criar-curso.module';
import { CursosModule } from './servicos/cursos/cursos.module';
import { ExemplosComponent } from './pipes/exemplos/exemplos.component';
import { CamelCasePipe } from './pipes/camel-case.pipe';

import ptBr from '@angular/common/locales/pt';
import esEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { SettingsService } from './servicos/settings.service';
import { FiltroArrayPipe } from './pipes/filtro-array.pipe';
import { FiltroArrayImpuroPipe } from './pipes/filtro-array-impuro.pipe';
import { RotasComponent } from './rotas/rotas.component';
import { LoginComponent } from './rotas/login/login.component';
import { HomeComponent } from './rotas/home/home.component';
//import { AlunosModule } from './rotas/alunos/alunos.module';
//import { CoursesModule } from './rotas/courses/courses.module';
//import { CoursesComponent } from './rotas/courses/courses.component';
//import { CourseDetailsComponent } from './rotas/courses/course-details/course-details.component';
//import { CourseNotFoundComponent } from './rotas/courses/course-not-found/course-not-found.component';
//import { CoursesService } from './rotas/courses/courses.service';

registerLocaleData(ptBr)
registerLocaleData(esEs)


@NgModule({
  declarations: [
    AppComponent,
    DataBindingComponent,
    InputPropertyComponent,
    OutputPropertyComponent,
    CicloComponent,
    DiretivaNgifComponent,
    DiretivaNgswitchComponent,
    DiretivaNgforComponent,
    DiretivaNgclassComponent,
    DiretivaNgstyleComponent,
    OperadorElvisComponent,
    ExemploNgContentComponent,
    FundoAmareloDirective,
    DiretivasCustomizadasComponent,
    HighlightMouseDirective,
    HighlightDirective,
    NgElseDirective,
    ExemplosComponent,
    CamelCasePipe,
    FiltroArrayPipe,
    FiltroArrayImpuroPipe,
    RotasComponent,
    LoginComponent,
    HomeComponent,
    //CoursesComponent,
    //CourseDetailsComponent,
    //CourseNotFoundComponent,
    //CursosComponent,
    //CriarCursoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MeuFormModule,
    CriarCursoModule,
    CursosModule,
    //CoursesModule,
    //AlunosModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    SettingsService,
    CoursesGuard,
    AlunosGuard,
    {
      provide: LOCALE_ID,
      deps:[SettingsService],
      useFactory: (settingsService) => settingsService.getLocale()
    },
    //CoursesService
    /*
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'  
    }*/
  ],
  //providers: [CursosService], //onde ficam os serviços para escopo global
  bootstrap: [AppComponent]
})
export class AppModule { }
