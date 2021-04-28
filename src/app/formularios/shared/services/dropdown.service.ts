import { Cidade } from '../models/cidade.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoBr } from '../models/estado-br.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor( private http: HttpClient) { }

  getCidades(idEstado: number){
    return this.http.get<Cidade[]>('assets/dados/cidades.json')
    .pipe(
      map((cidades: Cidade[]) => cidades.filter(c=> c.estado == idEstado))
    )
  }

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

  getNewslleter() {
    return [
      { valor:'S', desc: 'Sim' },
      { valor:'N', desc: 'Não' },
    ];
  }

}
