import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs";
import {Course} from "./course";

@Injectable()
export class CoursesService {

  constructor(private af:AngularFireDatabase) { }
    findAllCourses (): Observable<Course[]> {
      return this.af.list('courses').map(Course.fromJsonArray);
    }
  findLessonCourse (url) {
    console.log(url);
  }
}
