import { CoursesService } from './courses.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: any[];
  pagina: number;
  insricao: Subscription;

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.courses = this.coursesService.getCourses();
    this.insricao = this.route.queryParams.subscribe(
      (params: any) =>{
        this.pagina = params['p'];        
      }
    );
  }

  ngOnDestroy(){
    this.insricao.unsubscribe();
  }

  prevPage(){
    if (this.pagina < 2){
      this.pagina = 1;
    }else{      
      this.pagina--;
    }
    this.navegacaoPagina();    
  }
  
  nextPage(){
    this.pagina++;
    this.navegacaoPagina();
  }

  navegacaoPagina(){
    this.router.navigate(['/courses'],{
      queryParams:{ 'p': this.pagina } 
    });
  }

}
