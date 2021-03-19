import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  id: string;
  inscricao: Subscription;

  constructor(private route: ActivatedRoute) {
    //console.log(this.route);
    //this.id = this.route.snapshot.params['id']; //Obtém a foto de quando foi carregado, não detecta mudanças.
   }

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
      }
    );
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

}
