import {Component, OnInit, Input} from '@angular/core';
import {CoursesService} from "../shared/model/courses.service";
import {Observable} from "rxjs";
import {Lesson} from "../shared/model/lesson";
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../shared/model/course";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  course$: Observable<Course>;
  // lesson$: Observable<Lesson[]>;
  lessons$: Lesson[];
  courseUrl;
  constructor(private router:Router,
              private coursesService: CoursesService,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.courseUrl = this.route.snapshot.params['id'];
    this.course$ = this.coursesService.findLessonCourse(this.courseUrl);
    const lessons$ = this.coursesService.loadFirstLessonsPage(this.courseUrl, 3);
    lessons$.subscribe(lessons => this.lessons$ = lessons)
  }

  // 下一页
  next() {
    this.coursesService.loadNextPage(
      this.courseUrl,
      this.lessons$[this.lessons$.length - 1].$key,
      3
    )
      .subscribe(lessons => this.lessons$ = lessons);
  }

  // 上一页
  previous() {
    this.coursesService.loadPreviousPage(
      this.courseUrl,
      this.lessons$[this.lessons$.length - 3].$key,
      3
    )
      .subscribe(lessons => this.lessons$ = lessons);
  }

  navigateToLesson(lesson:Lesson) {
    this.router.navigate(['lessons',lesson.url]);
  }
}
