import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Lesson} from "./lesson";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class LessonsService {

  constructor(private af:AngularFireDatabase) {

  }
  findAllLessons(): Observable<Lesson[]> {
    return this.af.list('lessons')
      .do(console.log)
      .map(Lesson.fromJsonList);
  }
}
