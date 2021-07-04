import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.css']
})
export class LibSearchComponent implements OnInit {

  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$: Observable<any>;
  total: number;
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSearch(){
    let value = this.queryField.value;
    const fields = "name,description,version,homepage"
    if (value && value.trim() != ''){
      value = value.trim()  
      
      const params_2 = {
        search: value,
        fields: fields
      };

      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', fields);
      // params.append() // para mais de um valor para o search

      //this.results$ = this.http.get(this.SEARCH_URL + '?fields=' + fields + '&search=' + value)
      this.results$ = this.http.get(this.SEARCH_URL, { params })
        .pipe(
          tap((res: any) => this.total = res.total),
          map((res: any) => res.results)
        );
    }   

    // console.log(this.fieldVersion.value);
    // console.log(this.queryField.value);
  }

}
