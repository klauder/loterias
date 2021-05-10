import { Curso2Service } from './../curso2.service';
import { Curso } from './../curso';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../shared/alert-modal.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  dismissTimeout: number = 2500;

  constructor(
    private fb: FormBuilder,
    //private service: CursosService,
    private service: Curso2Service,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    /*
    let registro = null;
    
    this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        
        const curso$ = this.service.loadByID(id);

        curso$.subscribe(curso => {
          registro = curso;
          this.updateForm(curso); // porque isso é executado de forma assíncrona
        });

        // console.log(id);
      }
    );
*/
    // console.log(registro);

    // o Angular gerencia (subscribe/unsubscribe) em this.route.params
    /* this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap(id => this.service.loadByID(id)),
        // switchMap(cursos => obterAulas)
      )
      .subscribe(curso => this.updateForm(curso));
 */
    // concatMap -> a ordem da requisição importa
    // margeMap -> a ordem da requisição NÂO importa
    // exhaustMat -> Faz a requisição e obtém a resposta antes de fazer uma segunda tentativa (muito comum em casos de login)

    // Com guard Resolver
    const curso = this.route.snapshot.data['curso'];

    // os valores estão sendo inicializados no Resolver
    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]]
    });

  }

  /*
  updateForm(curso) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome
    });
  }
  */


  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      console.log('submit');
      let msgSuccess = 'Curso criado com sucesso!';
      let msgError = 'Erro ao criar curso, tente novamente mais tarde. Erro:!';
      
      if (this.form.value.id){
        msgSuccess = 'Curso atualizado com sucesso!';
        msgError = 'Erro ao atualizar curso, tente mais tarde. Erro:'
      }

      this.service.save(this.form.value)
        .subscribe(
          success => {
            this.modal.showAlertSuccess(msgSuccess, 1500);
            setTimeout(() => {
              this.location.back();
            }, this.dismissTimeout);
          },
          error => this.modal.showAlertDanger( msgError + error)          
        );

      /*
      if (this.form.value.id) {
        this.service.update(this.form.value).subscribe(
          success => {
            this.modal.showAlertSuccess('Curso atualizado com sucesso!', 1500);
            setTimeout(() => {
              this.location.back();
            }, this.dismissTimeout);
          },
          error => this.modal.showAlertDanger('Erro ao atualizar curso, tente mais tarde. Erro:' + error),
          () => console.log('update completo')
        );
      } else {
        this.service.create(this.form.value).subscribe(
          success => {
            this.modal.showAlertSuccess('Curso criado com sucesso!', 1500);
            setTimeout(() => {
              this.location.back();
            }, this.dismissTimeout);
          },
          error => this.modal.showAlertDanger('Erro ao cadastrar curso, tente mais tarde. Erro:' + error),
          () => console.log('create completo')
        );
      }*/
    }
  }

  onCancel() {
    this.submitted = false;
    //this.form.reset();
    //console.log('onCancel');
    this.location.back();
  }

}
