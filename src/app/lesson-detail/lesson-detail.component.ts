import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LessonsService} from "../shared/model/lessons.service";
import {Lesson} from "../shared/model/lesson";
import {} from "../p";

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss']
})
export class LessonDetailComponent implements OnInit {
  lesson:Lesson;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private lessonService: LessonsService) { }

  ngOnInit() {
    this.route.params.switchMap(params => {
      const lessonUrl = params['id'];
      return this.lessonService.findLessonByUrl(lessonUrl);
    })
      .subscribe(lesson => this.lesson = lesson);

    // const lessonUrl = this.route.snapshot.params["id"];
    // this.lessonService.findLessonByUrl(lessonUrl)
    //   .do(console.log)
    //   .subscribe(lesson => this.lesson = lesson);
    // lesson$.subscribe(console.log);
  }


  // lesson数组下边的$key是lessonPerCourse下边的Id
  // lesson数组下边的courseId 是lessonPerCourse下边的$key
  // 下一页
  next(){
    this.lessonService.loadNextLesson(this.lesson.courseId, this.lesson.$key)
      .subscribe(this.navigateToLesson.bind(this));
  }

  previous() {
    this.lessonService.loadPreviousLesson(this.lesson.courseId, this.lesson.$key)
      .subscribe(this.navigateToLesson.bind(this));
  }
  navigateToLesson(lesson: Lesson) {
    this.router.navigate(['lessons', lesson.url])
  }
}
