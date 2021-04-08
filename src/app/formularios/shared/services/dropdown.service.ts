import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoBr } from '../models/estado-br.model';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor( private http: HttpClient) { }

  getEstadosBr(){
    //return this.http.get('assets/dados/estadosbr.json');
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json');
  }

  getCargos(){
    return [
      {nome: 'Dev', nivel: 'Júnior', desc: 'Dev Jr'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
      {nome: 'Dev', nivel: 'Sênior', desc: 'Dev Sr'}
    ];
  }

  getTencologias(){
    return [
      {nome: 'java', desc: 'Java'},
      {nome: 'javascript', desc: 'JavaScript'},
      {nome: 'php', desc: 'Php'},
      {nome: 'ruby', desc: 'Ruby'}
    ];
  }

}
