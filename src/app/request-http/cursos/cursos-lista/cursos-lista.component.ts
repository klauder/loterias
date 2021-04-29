import { Observable } from 'rxjs';
import { CursosService } from './../cursos.service';
import { Curso } from './../curso';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos: Curso[];

  cursos$: Observable<Curso[]>; // variável que é Observable

  constructor(private service: CursosService) { }

  ngOnInit(): void {
    /*
    this.service.list()
    .subscribe(dados => this.cursos = dados);
    */

    this.cursos$ = this.service.list();
  }

}
