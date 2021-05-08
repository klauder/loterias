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
    private service: CursosService,
    private modal: AlertModalService,
    private location: Location) { }

  ngOnInit(): void {
    
    this.form = this.fb.group({
      nome: [null,[Validators.required, Validators.minLength(3), Validators.maxLength(255)]]
    });

  }

  hasError(field: string){
    return this.form.get(field).errors;
  }

  onSubmit(){
    this.submitted = true;

    if(this.form.valid){
      console.log('submit');
      this.service.create(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess('Curso criado com sucesso!', 1500);
          setTimeout(() => {
            this.location.back();
          }, this.dismissTimeout);
        },
        error => this.modal.showAlertDanger('Erro:' + error),
        () => console.log('request completo')
      );
    }
  }

  onCancel(){
    this.submitted = false;
    //this.form.reset();
    //console.log('onCancel');
    this.location.back();
  }

}
