import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { EstadoBr } from './../shared/models/estado-br.model';
import { DropdownService } from './../shared/services/dropdown.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  //estados: EstadoBr[];

  estados: Observable<EstadoBr[]>;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService
    ) { }

  ngOnInit(): void {

    /*
      this.dropdownService.getEstadosBr()
        .subscribe(dados => {this.estados = dados;console.log(dados);});
    */
    
    this.estados = this.dropdownService.getEstadosBr();
    
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required,Validators.minLength(3)]],
      email: [null, [Validators.required,Validators.email]],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required]],
        numero: [null, [Validators.required]],
        complemento: [null, [Validators.maxLength(10)]],
        rua: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]]
      }) 
           
    });
     
  }

  onSubmit(){
    //console.log(this.formulario);

    if (this.formulario.valid){
      let url: string = 'https://httpbin.org/post';
    
      let jsonData = JSON.stringify(this.formulario.value);
      this.http.post(url, jsonData)
        .subscribe(res =>{
          console.log(res);
  
          //reseta o form        
          //this.resetar();
        },
        (error: any) => alert('error')
        );
    }else{
      //console.log('Formulário Inválido');
      this.verificaValidacoesForm(this.formulario);  
    }
    
  }

  verificaValidacoesForm(formGroup: FormGroup){
    
    Object.keys(formGroup.controls).forEach(
      campo => {
        const controle = formGroup.get(campo);
        controle.markAsDirty();
        controle.markAsTouched();

        if (controle instanceof FormGroup){
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

  verificaRequired(campo){    
    return this.verificaValidAndTouchedOrDirty(campo) && this.formulario.get(campo).errors.required;
  }
  
  verificaEmail(campo){    
    return this.verificaValidAndTouchedOrDirty(campo) && this.formulario.get(campo).errors.email;
  }

  verificaMinlength(campo){    
    return this.verificaValidAndTouchedOrDirty(campo) && this.formulario.get(campo).errors.minlength;
  }
  
  verificaMaxlength(campo){    
    return this.verificaValidAndTouchedOrDirty(campo) && this.formulario.get(campo).errors.maxlength;
  }

  aplicaCssErro(campo: string){
    return{
      'has-error': this.verificaValidAndTouchedOrDirty(campo)
    }
  }

  consultaCEP() {
    //console.log(cep);
    let cep = this.formulario.get('endereco.cep').value;

    if (cep != null && cep !== ''){
      this.cepService.consultaCEP(cep)
        .subscribe(data => { this.populaDadosForm(data) });
    }

  }

  populaDadosForm(data){

    // Modifica somente os campos que desejamos
    this.formulario.patchValue({
      endereco: {
        cep: data.cep,
        rua: data.logradouro,
        complemento: data.complemento,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf
      }
    });
    //console.log(formulario);   
    
    this.formulario.get('nome').setValue('Klauder'); //Definir o valor de apenas 01 campo do formulario
    
  }

  resetaDadosCepForm(){
    this.formulario.patchValue({
      endereco: {
        cep: null,
        rua: null,
        numero: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null,
      }
    });
  }


}
