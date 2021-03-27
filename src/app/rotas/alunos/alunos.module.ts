import { AlunosService } from './alunos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlunosComponent } from './alunos.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunosRoutingModule } from './alunos.routing.module';
import { AlunosDesactivateGuard } from './../guards/alunos-deactivate.guard';

@NgModule({
    imports: [
        CommonModule,
        AlunosRoutingModule,
        FormsModule
    ],
    exports: [],
    declarations: [
        AlunosComponent, 
        AlunoFormComponent
    ],
    providers: [
        AlunosService,
        AlunosDesactivateGuard
    ],
})
export class AlunosModule { }
