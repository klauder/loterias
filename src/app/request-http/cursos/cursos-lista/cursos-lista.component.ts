import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EMPTY, Observable, Subject } from 'rxjs';
import { CursosService } from './../cursos.service';
import { Curso } from './../curso';
import { Component, OnInit } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //cursos: Curso[];
  bsModalRef: BsModalRef;
  cursos$: Observable<Curso[]>; // variável que é Observable
  error$ = new Subject<boolean>();

  constructor(
    private service: CursosService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    /*
    this.service.list()
    .subscribe(dados => this.cursos = dados);
    */

    this.onRefresh();
   
  }

  onRefresh(){
    this.cursos$ = this.service.list()
    .pipe(
      // map(),
      // tap()
      // switchMap()
      // colocar o catchError sempre por último
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        this.handleError();
        return EMPTY;
      })
    );

    this.service.list()
      .pipe(
        catchError(error => EMPTY)
      )
      .subscribe(
        dados => { 
          console.log(dados); 
        },
        error => console.error(error),
        () => console.log('Observable completo!')
      );
  }

  handleError(){
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';    
    this.bsModalRef.content.message = 'Error ao carregar cursos. Tente novamente mais tarde.';
  }

}
