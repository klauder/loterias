import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { filter, map, tap, distinctUntilChanged, debounce, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.css']
})
export class LibSearchComponent implements OnInit {

  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  readonly FIELDS = "name,description,version,homepage"
  queryField = new FormControl();
  results$: Observable<any>;
  total: number;
      
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.results$ = this.queryField.valueChanges
      .pipe(
        map(value => value.trim()),
        filter(value => value.length > 2), // enviar somente a partir do 3 caracter
        debounceTime(200), // delay
        distinctUntilChanged(), // não enviar valores repetidos
        //tap(value => console.log(value)),
        switchMap(value =>this.http.get(this.SEARCH_URL, { 
          params :{
            search: value,
            fields: this.FIELDS
          } 
        })),     
        tap((res: any) => this.total = res.total),
        map((res: any) => res.results)
      )
  }

  onSearch(){
    let value = this.queryField.value;
    if (value && value.trim() != ''){
      value = value.trim()  
      
      const params_2 = {
        search: value,
        fields: this.FIELDS
      };

      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', this.FIELDS);
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
