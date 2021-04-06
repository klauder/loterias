import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      nome: [null, Validators.required],
      email: [null, [Validators.required,Validators.email]]
    });
    
  }

  onSubmit(){
    console.log(this.formulario);

    let url: string = 'enderecoServer/formUsuario';

    url = 'https://httpbin.org/post';
    
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

}
