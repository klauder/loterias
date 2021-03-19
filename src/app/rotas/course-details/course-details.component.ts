import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  id: string;

  constructor(private route: ActivatedRoute) {
    console.log(this.route);
    this.id = this.route.snapshot.params['id'];
   }

  ngOnInit(): void {
  }

}
