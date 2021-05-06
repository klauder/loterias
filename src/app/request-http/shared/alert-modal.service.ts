import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DEFAULT = 'default',
  SECUNDARY = 'secundary',
  PRIMARY = 'primary'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService ) { }
  
  private showAlert(message: string, type: AlertTypes){    
    const bsModalRef : BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;    
    bsModalRef.content.message = message;
  }

  showAlertDanger(message: string){
    this.showAlert(message, AlertTypes.DANGER);
  }
  
  showAlertSuccess(message: string){
    this.showAlert(message, AlertTypes.SUCCESS);
  }
  
  showAlertInfo(message: string){
    this.showAlert(message, AlertTypes.INFO);
  }

  showAlertWarning(message: string){
    this.showAlert(message, AlertTypes.WARNING);
  }

  showAlertDefault(message: string){
    this.showAlert(message, AlertTypes.DEFAULT);
  }  

}