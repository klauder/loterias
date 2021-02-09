import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CursosService } from '../cursos/cursos.service';
import { CursosComponent } from './cursos.component';

@NgModule({
  declarations: [
    CursosComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [CursosComponent],
  //providers: [CursosService], //serviços de escopo local de cada componente
})
export class CursosModule { } 
