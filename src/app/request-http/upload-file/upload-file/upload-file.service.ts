import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  upload(files: Set<File>, url: string) {

    const formData = new FormData();

    files.forEach(file => formData.append('file', file, file.name));

    // request manual
    // const request = new HttpRequest('POST', url, formData);
    // return this.http.request(request);

    // request Angular
    return this.http.post(url, formData, {
      observe:'events',
      reportProgress: true      
    });
  }

  download(url: string) {
    return this.http.get(url,{
      responseType: 'blob' as 'json' // porque vamos receber um arquivo. Por default é JSON
    });
  }

  handleFile(res: any, fileName: string) {
    const file = new Blob([res], {
      type: res.type
    });
    
    // IE 11
    if (window.navigator && window.navigator.msSaveOrOpenBlob){
      window.navigator.msSaveOrOpenBlob(file);
      return; 
    }

    const blob = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = blob;
    console.log(file);
    link.download = fileName;
    //link.click(); // não funciona no Firefox
    link.dispatchEvent(new MouseEvent('click',{
      bubbles: true,
      cancelable: true,
      view: window
    }));

    // setTimeout é para executar o window.URL e link.remove no Firefox
    setTimeout(() => {
      window.URL.revokeObjectURL(blob);
      link.remove();  
    },100);       

  }

}
