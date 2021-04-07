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
}
