import { Component, OnInit } from '@angular/core';

import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  providers: [CursosService] //Dessa forma, o serviço é acessado somente por esse componente
})
export class CursosComponent implements OnInit {

  
  cursos: string[]=[];
  //cursosService: CursosService;

  constructor(private cursosService: CursosService) {
    //this.cursosService = new CursosService(); //instância manual NÃO RECOMENDADO (SEM INJEÇÃO DE DEPENDÊNCIA)
    this.cursosService = cursosService;
   }

  ngOnInit(): void {
    this.cursos = this.cursosService.getCursos();

    /*
    this.cursosService.emitirCursoCriado.subscribe(

      curso => console.log(curso)
      
      /*function(curso){
        console.log(curso);
      }*/
    //);
    
    //Estou acessando a instância de CursosService, para que instâncias diferentes possam se comunicar entre si
    CursosService.criouNovoCurso.subscribe(
      curso => this.cursos.push(curso)
    );
  }

}
