import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef( () => InputFieldComponent),
  multi: true
};

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  providers: [INPUT_FIELD_VALUE_ACCESSOR]
})

export class InputFieldComponent implements ControlValueAccessor {

  @Input() classeCss;
  @Input() id: string;
  @Input() label: string;
  @Input() type = 'text';
  @Input() placeholder: string;
  @Input() control;
  @Input() isReadOnly = false;
  
  private innerValue: any;
  
  get value(){
    return this.innerValue;
  }

  set value(v: any){
    if (v !== this.innerValue){
      this.innerValue = v;
      this.OnChangeCallBack(v);
    }
  }

  constructor() { }

  // placement
  OnChangeCallBack: (_: any) => void = () => {}; // função fake (placement) 
  OnTouchedCallBack: (_: any) => void = () => {}; // função fake (placement) 

  writeValue(v: any): void {
    this.value = v; // chama a função set
  }

  registerOnChange(fn: any): void {
    this.OnChangeCallBack = fn; // o angular controla para nós
  }

  registerOnTouched(fn: any): void {
    this.OnTouchedCallBack = fn; // o angular controla para nós
  }
  
  setDisabledState?(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }

}
