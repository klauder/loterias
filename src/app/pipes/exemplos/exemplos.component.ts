import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

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

  livros: string[] = ['Angular 2', 'Java','Phonegap','Linux'  ];

  filtro: string;

  valorAsync = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Valor assíncrono promise'), 2000)
  });
  
  valorAsync2 = interval(4000).pipe(
    map(valor => 'Valor assíncrono 2 interval'));

  constructor() { }

  ngOnInit(): void {
  }

  addLivro(valor){
    //console.log(valor);
    this.livros.push(valor);
  }

  obterCursos(){

    if (this.livros.length === 0 || this.filtro === undefined || this.filtro.trim() === ''){
      return this.livros;
    }

    return this.livros.filter((v) => {
      if (v.toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0){
        return true;
      }
      return false;
    });
/*
    return this.livros.filter(
      v => v.toLowerCase().includes(this.filtro.toLowerCase())
    );
*/
  }

}
