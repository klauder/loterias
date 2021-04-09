import { FormValations } from './../shared/form-validations';
import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { EstadoBr } from './../shared/models/estado-br.model';
import { DropdownService } from './../shared/services/dropdown.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
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
  cargos: any[];
  techs: any[];
  newsletterOp: any[];

  frameworks = ['Angular','React', 'Vue', 'Sencha'];

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
    this.cargos = this.dropdownService.getCargos();
    this.techs = this.dropdownService.getTencologias();
    this.newsletterOp = this.dropdownService.getNewslleter();

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required,Validators.minLength(3)]],
      email: [null, [Validators.required,Validators.email]],
      
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValations.cepValidator]],
        numero: [null, [Validators.required]],
        complemento: [null, [Validators.maxLength(10)]],
        rua: [null, [Validators.required]],
        bairro: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]]
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: ['S'],
      //termos: [null, Validators.pattern('true')], //validar checkbox    
      termos: [false, FormValations.requiredCheckbox], //validar checkbox  
      frameworks: this.buildFrameworks()
    });
     
  }

  buildFrameworks(){
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValations.requiredMinCheckbox(2));
  }

  onSubmit(){
    console.log(this.formulario);

    let valueSubmit = Object.assign({},this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v, i) => v ? this.frameworks[i] : null)
        .filter(v => v !== null)
    });

    console.log(valueSubmit);

    if (this.formulario.valid){
      let url: string = 'https://httpbin.org/post';

      this.http.post(url, JSON.stringify(valueSubmit))
        .subscribe(res =>{
          
          //console.log(res);
  
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

  validaCampo(campo, validacao){
    return (this.formulario.get(campo).invalid && this.formulario.get(campo).hasError(validacao) ) 
      && (this.formulario.get(campo).dirty || this.formulario.get(campo).touched);
  }
  
  /*
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

  verificaCheckbox(campo){    
    return this.formulario.get(campo).invalid && this.formulario.get(campo).errors.pattern;
  }
  */

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

  setarCargo(){
    const cargo = {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'};
    this.formulario.get('cargo').setValue(cargo);
  }

  setarTecnologias(){
    this.formulario.get('tecnologias').setValue(['java','php']);
  }

  compararCargos(obj1, obj2){
    return obj1 && obj2 ? (obj1.nivel === obj2.nivel && obj1.desc === obj2.desc) : obj1 === obj2;
  }
  
}
