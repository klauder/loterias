import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event){
    console.log(event);

    const selectedFiles = <FileList>event.srcElement.files;
    const fileName = [];

    for(let i=0; i<selectedFiles.length;i++ ){
      fileName.push(selectedFiles[i].name)
    }
    
    document.getElementById('customFileLabel').innerHTML = fileName.join(',');

  }

}
