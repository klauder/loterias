import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AlunosComponent } from "./alunos.component";
import { AlunosGuard } from './../guards/alunos.guard';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';

// as rotas são avaliadas na ordem de declaração. 
// as rotas Hardcoded são avaliadas primeiro do que as rotas dinâmicas
const alunosRoutes = [
    {path:'', component: AlunosComponent, 
        CanActivateChild: [AlunosGuard],
        children: [
            {path:'novo', component: AlunoFormComponent},
            {path:':id', component: AlunoDetalheComponent},
            {path:':id/editar', component: AlunoFormComponent}
        ]
    },    
];

@NgModule({
    imports:[RouterModule.forChild(alunosRoutes)],
    exports:[RouterModule]
})

export class AlunosRoutingModule {}