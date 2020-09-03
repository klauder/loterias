import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meu-form',
  templateUrl: './meu-form.component.html',
  styleUrls: ['./meu-form.component.css']
})
export class MeuFormComponent implements OnInit {

  nome = 'abc';

  pessoa: any  = {
    nome: 'Klauder Dias',
    idade: 32,
    endereco: {
      rua: 'rua',
      numero: 1,
      complemento: '',
      bairro: '',
      cidade: 'Betim',
      estado: 'MG'
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
