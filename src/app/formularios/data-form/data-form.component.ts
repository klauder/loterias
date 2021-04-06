import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required,Validators.minLength(3)]],
      email: [null, [Validators.required,Validators.email]]
    });
    
  }

  onSubmit(){
    console.log(this.formulario);

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

  aplicaCssErro(campo){
    return{
      'has-error': this.verificaValidAndTouchedOrDirty(campo)
    }
  }

}
