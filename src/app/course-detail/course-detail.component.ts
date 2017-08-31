import { Component, OnInit } from '@angular/core';
import {CoursesService} from "../shared/model/courses.service";
import {Observable} from "rxjs";
import {Lesson} from "../shared/model/lesson";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  lesson$: Observable<Lesson[]>;
  courseUrl;
  constructor(private coursesService: CoursesService,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.courseUrl = this.route.snapshot.params['id'];
    this.coursesService.findLessonCourse(this.courseUrl);
  }

}
