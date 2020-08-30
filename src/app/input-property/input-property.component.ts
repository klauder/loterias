import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-curso',
  templateUrl: './input-property.component.html',
  styleUrls: ['./input-property.component.css'],
  inputs: ['nomeCurso2:nome2']
})
export class InputPropertyComponent implements OnInit {

  @Input() nomeCurso: string = ''; //mais utilizado e dar preferência para o decoretor @Input na frente da variável
  
  //Internamente utilizamos a variável chamada 'nomeCurso', mas externamente utilizamos o 'nome'
  @Input('nome3') nomeCurso3: string = ''; 
  
  nomeCurso2: string = '';
 
  constructor() { }

  ngOnInit(): void {
  }

}
