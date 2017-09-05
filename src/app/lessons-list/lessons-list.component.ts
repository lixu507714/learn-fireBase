import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {Lesson} from "../shared/model/lesson";

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.scss']
})
export class LessonsListComponent implements OnInit {

  @Input() InputOption: Lesson;
  @Output() lesson = new EventEmitter<Lesson>();

  constructor() { }

  ngOnInit() {
  }

  selectLesson(lesson: Lesson) {
    this.lesson.emit(lesson);
  }
}
