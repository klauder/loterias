import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, delay, take } from 'rxjs/operators';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  
  private readonly API= `${environment.API}cursos`;

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Curso[]>(this.API)
      .pipe(
        delay(1000),
        tap(console.log)
      )
  }

  
  save(curso){
    if (curso.id){
      return this.update(curso);
    }
    
    return this.create(curso);
  }

  private create(curso){
    return this.http.post(this.API,curso).pipe(take(1));
  }
  
  private update(curso){
    return this.http.put(`${this.API}/${curso.id}`,curso).pipe(take(1));
  }

  loadByID(id: number){
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1));
  }  

  remove(id){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

}
