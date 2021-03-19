import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CoursesService } from './../courses/courses.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  id: number;
  inscricao: Subscription;
  course: any;

  constructor(
      private route: ActivatedRoute,
      private courseService: CoursesService,
      private router: Router
    ) {
    //console.log(this.route);
    //this.id = this.route.snapshot.params['id']; //Obtém a foto de quando foi carregado, não detecta mudanças.
   }

  ngOnInit(): void {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.course = this.courseService.getCourse(this.id);

        if (this.course == null) {
          this.router.navigate(['/courseNotFound']);
          //this.router.navigate(['/courseNotFound',this.id); //Isso é se precisar enviar parametros para a rota. 
                                                              //Lembrando será preciso fazer o subscribe e unsubscribe igual que no courseDetails
        }
        
      }
    );
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

}
