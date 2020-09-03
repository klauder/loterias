import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.css']
})
export class CicloComponent implements OnChanges, OnInit, 
  DoCheck, AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() valorInicial: number = 10;

  constructor() {
    this.log('constructor');
   }
  
  // Antes do ngOnInit e quando o valor property-binding é atualizado
  ngOnChanges(){    
    this.log('ngOnChanges');
  }
  
  // Quando o componente é atualizado
  ngOnInit(): void {
    this.log('ngOnInit');
  }

  //A cada ciclo de verificação de mudanças
  ngDoCheck(): void {
    this.log('ngDoCheck');
  }

  //depois de inserir conteúdo externo na view 
  ngAfterContentInit(): void {
    this.log('ngAfterContentInit');
  }

  //verifica o conteúdo inserido
  ngAfterContentChecked(): void {
    this.log('ngAfterContentChecked');
  }
    
  //verifica o conteúdo / conteúdo filh o depois de inserido
  ngAfterViewInit(): void {
    this.log('ngAfterViewInit');
  }

  //verifica o conteúdo / conteúdo filho depois de inserido
  ngAfterViewChecked(): void {
    this.log('ngAfterViewChecked');
  }

  //antes da diretiva/component ser destruído
  ngOnDestroy(): void {
    this.log('ngOnDestroy ');
  }

  //Isso é para não estar repetindo el console.log
  private log (hook: string){
    console.log(hook);
  }

}
