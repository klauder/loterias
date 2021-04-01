import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: 'Klauder Dias',
    email: 'klauder@email.com'
  }

  constructor() { }

  ngOnInit(): void {
  }

  // [(ngModel)] TWO-WAY-DATABIND É para quando necessito atualizar o valor
  // [ngModel] Property Binding é para quando necessito SOMENTE INICIALIZAR o campo com um valor que NÃO SERÁ ATUALIZADO
  onSubmit(form){
    console.log(form);
    console.log(this.usuario);    
  }
}
