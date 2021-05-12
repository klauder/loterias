import { Observable, Subscription } from 'rxjs';
import { UploadFileService } from './upload-file.service';
import { AlertModalService } from './../../shared/alert-modal.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  files: Set<File>; // Set evita arquivos duplicados no upload
  insricao$: Subscription;
 
  constructor(
    private modalService: AlertModalService,
    private service: UploadFileService
  ) { }

  ngOnInit(): void {
  }

  onChange(event) {
    console.log(event);

    const selectedFiles = <FileList>event.srcElement.files;
    const fileName = [];
    this.files = new Set();

    for (let i = 0; i < selectedFiles.length; i++) {
      fileName.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }

    document.getElementById('customFileLabel').innerHTML = fileName.join(',');

  }

  onUpload() {
    // Cors enviar sempre uma requisição para verificar se está tudo bem. Por isso não utilizamos o take(1)
    if (this.files && this.files.size > 0) {
     this.insricao$ =  this.service.upload(this.files,'http://localhost:8000/upload')
        .subscribe(response => console.log('Upload Concluído'));
    }
    else {
      this.modalService.showAlertDanger('Favor seleccionar pelo menos 01 arquivo.');
    }
    //TODO unsubscribe

  }

  
  OnDestroy(){
    this.insricao$.unsubscribe();
    console.log('Unsubscribe -> inscricao$');
  }

}