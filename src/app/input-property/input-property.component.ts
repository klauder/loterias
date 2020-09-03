import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-curso',
  templateUrl: './input-property.component.html',
  styleUrls: ['./input-property.component.css']
  // inputs: ['nomeCurso2:nome2']
})
export class InputPropertyComponent implements OnInit {

  @Input() nomeCurso = ''; // mais utilizado e dar preferência para o decoretor @Input na frente da variável
  @Input('nome2') nomeCurso2 = ''; // estaba com // inputs: ['nomeCurso2:nome2'], alterei por causa do tslin     
  @Input('nome3') nomeCurso3 = ''; // internamente utilizamos a variável chamada 'nomeCurso', mas externamente utilizamos o 'nome'
   
  constructor() { }

  ngOnInit(): void {
  }

}
