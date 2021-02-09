import { Component, OnInit } from '@angular/core';

import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  
  cursos: string[]=[];
  cursosService: CursosService;

  constructor() {
    this.cursosService = new CursosService(); //instância manual NÃO RECOMENDADO (SEM INJEÇÃO DE DEPENDÊNCIA)
   }

  ngOnInit(): void {
    this.cursos = this.cursosService.getCursos();
  }

}
