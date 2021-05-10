import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
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
  
  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number){    
    const bsModalRef : BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;    
    bsModalRef.content.message = message;

    if (dismissTimeout){
      dismissTimeout = 2000; // 2 segundos
        
      setTimeout(() => {
        bsModalRef.hide()
      }, dismissTimeout);

    }

  }

  showAlertDanger(message: string, dismissTimeout?: number){
    this.showAlert(message, AlertTypes.DANGER, dismissTimeout);
  }
  
  showAlertSuccess(message: string, dismissTimeout?: number){
    this.showAlert(message, AlertTypes.SUCCESS, dismissTimeout);
  }
  
  showAlertInfo(message: string, dismissTimeout?: number){
    this.showAlert(message, AlertTypes.INFO, dismissTimeout);
  }

  showAlertWarning(message: string, dismissTimeout?: number){
    this.showAlert(message, AlertTypes.WARNING, dismissTimeout);
  }

  showAlertDefault(message: string, dismissTimeout?: number){
    this.showAlert(message, AlertTypes.DEFAULT, dismissTimeout);
  }  

  showConfirm(title: string, message:string, okTxt?: string, cancelTxt?: string){
    const bsModalRef : BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;    
    bsModalRef.content.message = message;

    if (okTxt){
      bsModalRef.content.okTxt = okTxt;
    }

    if (cancelTxt){
      bsModalRef.content.cancelTxt = cancelTxt;
    }
    
    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;

  }

}