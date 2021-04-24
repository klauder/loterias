import { FormArray, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent implements OnInit {

  formulario: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  abstract submit();
  
  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    }else{
      //console.log('Formulário Inválido');
      this.verificaValidacoesForm(this.formulario);  
    }
  }

  
  verificaValidacoesForm(formGroup: FormGroup | FormArray){
    
    Object.keys(formGroup.controls).forEach(
      campo => {
        const controle = formGroup.get(campo);
        controle.markAsDirty();
        controle.markAsTouched();

        if (controle instanceof FormGroup || controle instanceof FormArray){
          this.verificaValidacoesForm(controle);
        }
      });
  }
  
  resetar(){
    this.formulario.reset();
  }

  verificaValidAndTouchedOrDirty(campo){
    return this.formulario.get(campo).invalid && (this.formulario.get(campo).dirty || this.formulario.get(campo).touched);
  }

  validaCampo(campo, validacao){
    //console.log(campo);
    return (this.formulario.get(campo).invalid && this.formulario.get(campo).hasError(validacao) ) 
      && (this.formulario.get(campo).dirty || this.formulario.get(campo).touched);
  }
  
  verificaMinlength(campo){    
    //console.log(campo);
    return this.verificaValidAndTouchedOrDirty(campo) && this.formulario.get(campo).errors.minlength;
  }
  
  aplicaCssErro(campo: string){
    return{
      'has-error': this.verificaValidAndTouchedOrDirty(campo)
    }
  }

}
