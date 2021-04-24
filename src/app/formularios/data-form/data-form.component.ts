import { BaseFormComponent } from './../shared/base-form/base-form.component';
import { VerificaEmailService } from './services/verifica-email.service';
import { FormValations } from './../shared/form-validations';
import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { EstadoBr } from './../shared/models/estado-br.model';
import { DropdownService } from './../shared/services/dropdown.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { EMPTY, Observable, empty } from 'rxjs';
import { distinct, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {


  //formulario: FormGroup; // Está em BaseFormComponent
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
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
    ) 
    { super(); }

  ngOnInit(): void {

    /*
      this.dropdownService.getEstadosBr()
        .subscribe(dados => {this.estados = dados;console.log(dados);});
    */
    
    //this.verificaEmailService.verificarEmail('email@email.com').subscribe();
    this.estados = this.dropdownService.getEstadosBr();
    this.cargos = this.dropdownService.getCargos();
    this.techs = this.dropdownService.getTencologias();
    this.newsletterOp = this.dropdownService.getNewslleter();

    //Validation Forms
    //https://github.com/yuyang041060120/ng2-validation

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
      email: [null, [Validators.required,Validators.email],[this.validarEmail.bind(this)]],
      confirmarEmail: [null, FormValations.equalsTo('email')],

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
 
    // Escutar eventos depois que o formulario foi criado
    this.formulario.get('endereco.cep').statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('statusChanges CEP: ', value)),
          switchMap(status => status === 'VALID' ? 
            this.cepService.consultaCEP(this.formulario.get('endereco.cep').value) 
              : EMPTY
        )
      )
      .subscribe(data => data ? this.populaDadosForm(data) : {});

  }

  buildFrameworks(){
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values, FormValations.requiredMinCheckbox(2));
  }

  submit() {
    // console.log(this.formulario);

    let valueSubmit = Object.assign({},this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v, i) => v ? this.frameworks[i] : null)
        .filter(v => v !== null)
    });

    console.log(valueSubmit);

    let url: string = 'https://httpbin.org/post';

    this.http.post(url, JSON.stringify(valueSubmit))
      .subscribe(res =>{
        
        //console.log(res);

        //reseta o form        
        //this.resetar();
      },
      (error: any) => alert('error')
      );

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

  validarEmail(formControl: FormControl){
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(
        map(emailExiste => emailExiste ? { emailCadastrado: true } : null)
      );
  }
  
}
