import { AlunoDetalheResolver } from './guards/aluno-detalhe.resolver';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AlunosComponent } from "./alunos.component";
import { AlunosGuard } from './../guards/alunos.guard';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunosDesactivateGuard } from './../guards/alunos-deactivate.guard';

// as rotas são avaliadas na ordem de declaração. 
// as rotas Hardcoded são avaliadas primeiro do que as rotas dinâmicas
const alunosRoutes = [
    {path:'', component: AlunosComponent, 
        canActivateChild: [AlunosGuard],
        children: [
            {path:'novo', component: AlunoFormComponent},
            {
                path:':id', 
                component: AlunoDetalheComponent,
                resolve: {alunoResolverInfo: AlunoDetalheResolver}
            },
            {
                path:':id/editar', 
                component: AlunoFormComponent,
                canDeactivate:[AlunosDesactivateGuard]
            }
        ]
    },    
];

@NgModule({
    imports:[RouterModule.forChild(alunosRoutes)],
    exports:[RouterModule]
})

export class AlunosRoutingModule {}