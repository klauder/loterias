
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  url = 'https://klauderdias.com';
  cursoAngular = true;
  urlImagem = 'http://lorempixel.com/400/200/nature/';
  valorAtual = '';
  valorSalvo = '';
  isMouseOver = false;
  nomeCurso = 'Curso de Angular';
  nomeDoCurso2 = 'Curso 2';
  nomeDoCurso3 = 'Curso 3';
  valorInicial = 15;

  getValor(): number {
    return 1;
  }

  getCurtirCurso(): boolean {
    return true;
  }

  botaoClicado(): void {
    alert('Botão clicado.');
  }

  onKeyUp(evento: KeyboardEvent): void {
    // console.log((<HTMLInputElement>evento.target).value);
    this.valorAtual = (<HTMLInputElement>evento.target).value;
  }

  salvarValor(valor): void {
    this.valorSalvo = valor;
  }

  onMouseOverOut(): void {
    this.isMouseOver = !this.isMouseOver;
  }

  onMudouValor(evento): void {
    console.log(evento.novoValor);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
