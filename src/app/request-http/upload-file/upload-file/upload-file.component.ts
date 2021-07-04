import { environment } from 'src/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { UploadFileService } from './upload-file.service';
import { AlertModalService } from './../../shared/alert-modal.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { filterResponse, UploadProgress } from '../../shared/rxjs-operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  files: Set<File>; // Set evita arquivos duplicados no upload
  insricao$: Subscription;
  progress = 0;
 
  constructor(
    private modalService: AlertModalService,
    private service: UploadFileService
  ) { }

  ngOnInit(): void {
  }

  onChange(event) {
    // console.log(event);

    const selectedFiles = <FileList>event.srcElement.files;
    const fileName = [];
    this.files = new Set();

    for (let i = 0; i < selectedFiles.length; i++) {
      fileName.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }

    document.getElementById('customFileLabel').innerHTML = fileName.join(',');

    this.progress = 0;
  }

  onUpload() {
    // Cors enviar sempre uma requisição para verificar se está tudo bem. Por isso não utilizamos o take(1)
    if (this.files && this.files.size > 0) {
     this.insricao$ =  this.service.upload(this.files, environment.BASE_URL + '/upload') //spi está definida em proxy.config
      .pipe(
        UploadProgress(progress => {
          console.log(progress);
          this.progress = progress;
        }),
        filterResponse()
      )
      .subscribe(response => this.modalService.showAlertSuccess('Upload Concluído!!!'));

      /*        
        .subscribe((event: HttpEvent<object>) => {
          // HttpEventType.UploadProgress // Funciona somente com Upload/Download de arquivos.
          // console.log(event);

          switch (event.type) {
            case HttpEventType.Response:
              // console.log('Upload Concluído');    
              // this.progress = 0;
              this.modalService.showAlertSuccess('Upload Concluído!!!');
              break;
            case HttpEventType.UploadProgress:
              const percentDone = Math.round((event.loaded * 100) / event.total);
              // console.log('Progresso:' + percentDone);
              this.progress = percentDone;
              break;
            default:
              break;
          }
        });
          */
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