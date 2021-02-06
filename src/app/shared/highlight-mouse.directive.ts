import { Directive, HostListener, HostBinding,
    ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[highlightMouse]'
})
export class HighlightMouseDirective {

  @HostListener('mouseenter') onMouseOver(){
    this.backgroundColor = 'yellow';
    /*this._renderer.setStyle(
      this._elementRef.nativeElement,
        'background-color','yellow'
    );*/
  }

  @HostListener('mouseleave') onMouseLeave(){
    /*this._renderer.setStyle(
      this._elementRef.nativeElement,
        'background-color','white'
    );*/
    this.backgroundColor = 'white';
  }

  //Se não necessitar manipulação
  //@HostBinding('style.background-color') backgroundColor: string;

  //Quando necessita manipulação da variável
  @HostBinding('style.background-color') get setColor(){
    // pode adicionar código extra se necessário

    return this.backgroundColor;
  }

  private backgroundColor: string;

  constructor(
    /*
    private _elementRef: ElementRef,
    private _renderer: Renderer2
    */ ) { }
}
