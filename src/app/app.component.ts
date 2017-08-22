import { Component } from '@angular/core';
import {initializeApp, database } from 'firebase';
// import { AngularFire } from 'angularfire';
import { FirebaseObjectObservable, FirebaseListObservable } from "angularfire2/database";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  courses$:FirebaseListObservable<any>;
  lessons$:FirebaseObjectObservable<any>;

  constructor () {
    // Initialize Firebase
   // let config = {
   //   apiKey: "AIzaSyDMJ6tIlEzy5zF4t3AnUOPjCTnx3xc7Dbc",
   //   authDomain: "learn-firebase-ac077.firebaseapp.com",
   //   databaseURL: "https://learn-firebase-ac077.firebaseio.com",
   //   projectId: "learn-firebase-ac077",
   //   storageBucket: "learn-firebase-ac077.appspot.com",
   //   messagingSenderId: "1006320598124"
   // };
   // initializeApp(config);
   //
   // // let root = database().ref('testArray');
   //  let root = database().ref();
   // root.on('value',function(snap){
   //     console.log(snap.val())
   // })
   //  this.courses$ = af.database.list('courses');
   //  this.lessons$ = af.database.list('lessons');
  }

  listPush () {

  }

  listRemove () {

  }

  listUpdate () {

  }

  objUpdate () {

  }

  objSet () {

  }

}
