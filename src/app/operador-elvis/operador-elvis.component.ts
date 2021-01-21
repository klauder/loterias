import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operador-elvis',
  templateUrl: './operador-elvis.component.html',
  styleUrls: ['./operador-elvis.component.css']
})
export class OperadorElvisComponent implements OnInit {

  tarefa: any = {
    descricao: 'Descrição da tarefa',
    responsavel: {
      usuario: null
    }
  };

  tarefa_elvis: any = {
    descricao: 'Descrição da tarefa 02',
    responsavel: {
      usuario: {
        nome: 'Klauder Dias'
      }
    }
  };
  constructor() { }

  ngOnInit(): void {
  }

}
