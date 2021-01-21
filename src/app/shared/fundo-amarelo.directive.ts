import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'button[fundoAmarelo]' //A tag p, é para que aplique a tag somente nas tags 'p' do html, podemos aplicar a diretiva as tags html e sobre os nossos componentes criados, por exemplo: operador elvis
})
export class FundoAmareloDirective {

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2) { 
    //console.log(this._elementRef);
    //this._elementRef.nativeElement.style.backgroundColor='yellow'; //Não recomendado, por possibilitar ataques xxs

    this._renderer.setStyle(
      this._elementRef.nativeElement,
      'background-color',
      'yellow');
  }

}
