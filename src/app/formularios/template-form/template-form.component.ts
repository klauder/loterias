import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null,
    cep: null,
    rua: null,
    numero: null,
    complento: null,
    bairro: null,
    cidade: null,
    estado: null,
    nome2: 'Não muda valores',
    email2: 'teste@gmail.com'
  }
  
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }


  // [(ngModel)] TWO-WAY-DATABIND É para quando necessito atualizar o valor
  // [ngModel] Property Binding é para quando necessito SOMENTE INICIALIZAR o campo com um valor que NÃO SERÁ ATUALIZADO
  onSubmit(form){
    //console.log(form);
    //console.log(this.usuario);     
  }

  verificaValidAndTouchedOrDirty(campo){
    return campo.invalid && (campo.dirty || campo.touched);
  }

  verificaRequired(campo){
    return (campo.invalid && (campo.dirty || campo.touched) && campo.errors.required);
  }

  aplicaCssErro(campo){
    return{
      'hasError': this.verificaValidAndTouchedOrDirty(campo)
    }
  }

  consultaCEP(cep){
    //console.log(cep);

       //Nova variável "cep" somente com dígitos.
      cep = cep.replace(/\D/g, '');

       //Verifica se campo cep possui valor informado.
       if (cep != "") {

           //Expressão regular para validar o CEP.
           var validacep = /^[0-9]{8}$/;

           //Valida o formato do CEP.
           if(validacep.test(cep)) {               
              this.http.get(`//viacep.com.br/ws/${cep}/json`)
              .subscribe(data => { console.log(data); });
           }

        }
  }


}
