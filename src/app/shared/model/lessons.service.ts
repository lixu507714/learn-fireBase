import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Lesson} from "./lesson";
import {AngularFireDatabase} from "angularfire2/database";
import {FirebaseApp} from "angularfire2";
import {Subject} from "rxjs/Subject";

@Injectable()
export class LessonsService {

  sdkdb: any;
  constructor(private af:AngularFireDatabase,
              @Inject(FirebaseApp) fb: FirebaseApp) {
    this.sdkdb = fb.database().ref();
    console.log('this.sdkdb');
    console.log(this.sdkdb);

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

  createNewLesson(courseId: string, lesson: string): Observable<any> {
    const lessonToSave = Object.assign({}, lesson, {courseId});
    const newLessonKey = this.sdkdb.child('lessons').push().key;
    let dataToSave = {};
    dataToSave[`lessons/${newLessonKey}`] = lessonToSave;
    dataToSave[`lessonPerCourse/${courseId}/${newLessonKey}`] = true;
    return this.firebaseUpdate(dataToSave);
  }

  firebaseUpdate(dataToSave): Observable<any> {
    const subject = new Subject();
    this.sdkdb.update(dataToSave)
      .then(
        val => {
          subject.next(val);
          subject.complete();
        },
        err => {
          subject.error(err);
          subject.complete();
        }
    );
    return subject.asObservable();
  }


  requestLessonDeletion (lessonId: string, courseId: string) {
    this.sdkdb.child('queue/tasks').push({lessonId, courseId})
        .then(
          () => alert('lesson deletion requested!')
        );
  }
}
