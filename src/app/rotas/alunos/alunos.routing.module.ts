import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AlunosComponent } from "./alunos.component";

// as rotas são avaliadas na ordem de declaração. 
// as rotas Hardcoded são avaliadas primeiro do que as rotas dinâmicas
const alunosRoutes = [
    {path:'alunos', component: AlunosComponent, 
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