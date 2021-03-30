import { AlunosService } from './../alunos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent implements OnInit {

  aluno: Aluno;
  inscricao: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alunosService: AlunosService
    ) { }

  ngOnInit(): void {
    /*
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        //console.log(params);
        let id = params['id'];
        this.aluno = this.alunosService.getAluno(id);
        if (this.aluno == null) {
          this.aluno = {};
        }      
      }
    );*/
    console.log('ngOnInit: AlunoDetalheComponent');
    this.inscricao = this.route.data.subscribe(
      (info: {alunoResolverInfo: Aluno} ) => {
        //console.log(info);
        console.log('Recebendo o obj Aluno do resolver');
        this.aluno = info.alunoResolverInfo; // esse é o parâmetro que passamos na rota do resolver
      }
    );
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

  editarContato(){
    this.router.navigate(['/alunos', this.aluno.id,'editar']);
  }

}
