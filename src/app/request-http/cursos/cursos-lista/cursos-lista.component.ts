import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../shared/alert-modal.service';
import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EMPTY, Observable, Subject } from 'rxjs';
import { CursosService } from './../cursos.service';
import { Curso } from './../curso';
import { Component, OnInit, ViewChild } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  // cursos: Curso[];
  deleteModalRef: BsModalRef;
  cursos$: Observable<Curso[]>; // variável que é Observable
  error$ = new Subject<boolean>();
  @ViewChild('deleteModal') deleteModal;
  idCursoSelecionado: number;

  constructor(
    private service: CursosService,
    private modalService: BsModalService,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    /*
    this.service.list()
    .subscribe(dados => this.cursos = dados);
    */

    this.onRefresh();

  }

  onRefresh() {
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

    /*
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
          );*/
  }

  handleError() {
    this.alertService.showAlertDanger('Error ao carregar cursos. Tente novamente mais tarde.');
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';    
    // this.bsModalRef.content.message = 'Error ao carregar cursos. Tente novamente mais tarde.';
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], { relativeTo: this.route });
  }

  onDelete(id) {
    this.idCursoSelecionado = id;
    this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
  }

  onConfirmDelete(): void {

    this.service.remove(this.idCursoSelecionado)
      .subscribe(
        success => {
          this.onRefresh(),
          this.deleteModalRef.hide()
        },
        error => {
          this.alertService.showAlertDanger('Erro remover o curso. Favor tentar mais tarde!'),
          this.deleteModalRef.hide()
        }
      );
  }

  onDeclineDelete(): void {
    this.deleteModalRef.hide();
  }

}
