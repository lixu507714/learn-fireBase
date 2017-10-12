import {Component, Input, OnInit} from '@angular/core';
import {Lesson} from "../shared/model/lesson";
import {ActivatedRoute} from "@angular/router";
import {LessonsService} from "../shared/model/lessons.service";

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.scss']
})
export class EditLessonComponent implements OnInit {

  lesson: Lesson;

  constructor(private route: ActivatedRoute,
              private lessonService: LessonsService) {

    route.data
      .do(console.log)
      .subscribe(
      data => this.lesson = data['lesson']
    );
  }

  ngOnInit() {
  }

  save(lesson) {

    this.lessonService.saveLesson(this.lesson.$key, lesson)
      .subscribe(
        () => {
          alert("lesson created successfully. Create another lesson ?");
        },
        err => alert(`error creating lesson ${err}`)
      )
  }

}
