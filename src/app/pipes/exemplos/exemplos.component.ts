import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exemplos',
  templateUrl: './exemplos.component.html',
  styleUrls: ['./exemplos.component.css']
})
export class ExemplosComponent implements OnInit {

  livro: any = {
    titulo:'Learning JavaScript Data Structures and Algorithms',
    avaliacao:4.54321,
    numeroPaginas:314,
    preco: 44.99,
    dataLancamento: new Date(2016,5,23), // 23/06/2016
    url: 'http://a.co/glqjpRP'
  }; 

  livros: string[] = ['Angular 2', 'Java','Phonegap','Linux'];

  filtro: string;

  constructor() { }

  ngOnInit(): void {
  }

  addLivro(valor){
    //console.log(valor);
    this.livros.push(valor);
  }

}
