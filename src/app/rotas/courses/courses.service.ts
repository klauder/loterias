import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  getCourses(){
    return [
      { id: 1, nome: 'Angular 2 '},
      { id: 2, nome: 'Java'}
    ]
  }

  getCourse(id: number){
    let courses = this.getCourses();

    for(let i=0; i<courses.length; i++){
      let course = courses[i];
      if (course.id == id){
        return course;
      }
    }
    return null;
  }

  constructor() { }
}
