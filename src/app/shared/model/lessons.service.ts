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
  findLessonByUrl(url:string): Observable<Lesson> {
   return this.af.list("lessons",
      {
        query:{
          orderByChild: 'url',
          equalTo: url
        }
      })
     .do(console.log)
     .map(results => Lesson.fromJson(results[0]));
  }


  // 下一页
  loadNextLesson(courseId: string, lessonId: string): Observable<Lesson> {
    return this.af.list(`lessonsPerCourse/${courseId}`, {
        query: {
          orderByKey: true,
          startAt: lessonId,
          limitToFirst: 2
        }
    }).do(console.log)
      .map(result => result[1].$key)
      .switchMap(lessonId => this.af.object(`lessons/${lessonId}`))
      .map(Lesson.fromJson);
  }

  // 上一页
  loadPreviousLesson(courseId: string, lessonId: string): Observable<Lesson> {
    return this.af.list(`lessonsPerCourse/${courseId}`, {
      query: {
        orderByKey: true,
        endAt: lessonId,
        limitToFirst: 2
      }
    }).do(console.log)
      .map(result => result[0].$key)
      .switchMap(lessonId => this.af.object(`lessons/${lessonId}`))
      .map(Lesson.fromJson);
  }
}
