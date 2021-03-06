import { FormValations } from './../form-validations';
import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {

  // @Input() mostrarErro: boolean;
  // @Input() msgErro: string;
  @Input() control: FormControl;
  @Input() css: string = 'danger';
  @Input() label: string;

  constructor() { }

  ngOnInit(): void {
    
  }

  get errorMessage(){

    for(const propertyName in this.control.errors){
      
      if (this.control.errors.hasOwnProperty(propertyName) && (this.control.touched || this.control.dirty)) {
        //console.log(FormValations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]));
        https://www.youtube.com/watch?v=caumPDVYZN4&list=PLGxZ4Rq3BOBoSRcKWEdQACbUCNWLczg2G&index=118    
        return FormValations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
      }

    }
    
    return null;
  }

}
