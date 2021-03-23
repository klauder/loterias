import { Router } from '@angular/router';
import { AlunosService } from './alunos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  public alunos: any[] = [];
  
  constructor(
    private alunosService: AlunosService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.alunos = this.alunosService.getAlunos();
  }

  novoContato(){
    this.router.navigate(['/alunos','novo']);
  }

}