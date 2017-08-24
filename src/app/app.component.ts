import { Component } from '@angular/core';
import {initializeApp, database } from 'firebase';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // courses$:FirebaseListObservable<any>;
  // lessons$:Observable<any>;
  //
  // constructor (private af:AngularFireDatabase) {
  //   this.courses$ = af.list('courses');
  //   this.lessons$ = af.list('lessons');
  //
  //   this.courses$.subscribe(
  //     courses => console.log(courses)
  //   );
  //   // this.courses$ = af.object('we');
  //   this.lessons$ = af.object('lessons/-Ks6y0XhHVfW5V4_FolC');
  //   this.lessons$.subscribe(
  //     lessons => console.log(lessons)
  //   );
  //   // this.courses$.map(courses => courses[0])
  //   //   .subscribe(
  //   //     course => this.firstCourse = course
  //   //   )
  // }
  //
  // listPush () {
  //   this.courses$.push({description:'the new course'})
  //     .then(
  //       () => {
  //         console.log('list push done!')
  //       }
  //     )
  // }
  //
  // listRemove () {
  //   // this.courses$.remove(this.firstCourse);
  // }
  //
  // listUpdate () {
  //     // this.courses$.update({})
  // }
  //
  // objUpdate () {
  //
  // }
  //
  // objSet () {
  //
  // }

}
