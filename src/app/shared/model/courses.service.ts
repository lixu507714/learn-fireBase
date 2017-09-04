import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database/database";
import {Observable} from "rxjs";
import {Course} from "./course";
import {Lesson} from "./lesson";
import {FirebaseListFactoryOpts} from "angularfire2/interfaces";

@Injectable()
export class CoursesService {
  // course$:Observable<Course[]>;
  constructor(private af: AngularFireDatabase) {
  }

  findAllCourses(): Observable<Course[]> {
    return this.af.list('courses').map(Course.fromJsonArray);
  }

  findLessonCourse(courseUrl: string): Observable<Course> {
    // console.log(courseUrl);
    // firebase 会自动将节点的键编入索引  相当于操作数据库的一条数据
    return this.af.list('courses', {
      query: {
        orderByChild: 'url', // 使用orderByChild 编制索引
        equalTo: courseUrl
      }
    })
    // .do(console.log)
      .map(result => result[0]);
  }

  findLessonsKeysPerCourseUrl(courseUrl: string,query:FirebaseListFactoryOpts = {}): Observable<string[]> {
    return this.findLessonCourse(courseUrl)
      .switchMap(course => this.af.list(`lessonsPerCourse/${course.$key}`,query))
      .map(lspc => lspc.map(lpc => lpc.$key));
  }


  findLessonsForLessonsKeys(lessonKey$:Observable<string[]>): Observable<Lesson[]> {
    return lessonKey$
      .map(lspc => lspc.map(lessonKey => this.af.object(`lessons/` + lessonKey)))
      .flatMap(fbojs => Observable.combineLatest(fbojs));
  }

  findAllLessonsForCourse(courseUrl: string): Observable<Lesson[]> {
    // const course$ = this.findLessonCourse(courseUrl)
    //   .do(console.log);
    // const lessonsPerCourses$ = course$.switchMap(course => {
    //   return this.af.list(`lessonsPerCourse/${course.$key}`)
    // }).do(console.log);
    //
    // return lessonsPerCourses$
    //   .map(lspc => {
    //     return lspc.ap(lpc => {
    //       return this.af.object(`lessons/${lpc.$key}`)
    //     })
    //   })
    //   .flatMap(fbojs => Observable.combineLatest(fbojs));


    // return this.findLessonsKeysPerCourseUrl(courseUrl)
      // .map(lspc => lspc.map(lessonKey => this.af.object(`lessons/` + lessonKey)))
      // .flatMap(fbojs => Observable.combineLatest(fbojs));

    return this.findLessonsForLessonsKeys(this.findLessonsKeysPerCourseUrl(courseUrl));
  }

  loadFirstLessonsPage(courseUrl:string, pageSize:number): Observable<Lesson[]> {
    const firstPageLessonKeys$ = this.findLessonsKeysPerCourseUrl(courseUrl,
      {
        query: {
          limitToFirst: pageSize
        }
      });
    return this.findLessonsForLessonsKeys(firstPageLessonKeys$);
  }
  // 下一页
  loadNextPage(courseUrl:string,
               lessonKey:string,
               pageSize:number):Observable<Lesson[]> {
    const lessonKeys$ = this.findLessonsKeysPerCourseUrl(courseUrl,
      {
        query: {
          orderByKey: true,
          startAt: lessonKey,
          limitToFirst:pageSize + 1
        }
      });
    return this.findLessonsForLessonsKeys(lessonKeys$)
      .map(lessons => lessons.slice(1,lessons.length));
  }

  //上一页
  loadPreviousPage(courseUrl:string,
                  lessonKey:string,
                  pageSize:number):Observable<Lesson[]>{

    const lessonKeys$ = this.findLessonsKeysPerCourseUrl(courseUrl,
      {
        query: {
          orderByKey: true,
          endAt: lessonKey,
          limitToLast:pageSize + 1
        }
      });
    return this.findLessonsForLessonsKeys(lessonKeys$)
      .map(lessons => lessons.slice(0,lessons.length-1));

  }
}
