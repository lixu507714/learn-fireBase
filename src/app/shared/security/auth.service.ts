import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AngularFireAuth} from "angularfire2/auth";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthService {

  constructor(private auth:AngularFireAuth ) { }

  login(email, password): Observable<any> {

    return
    // return this.formFirebaseAuthPromise(this.auth.login({email, password}));
  }

  formFirebaseAuthPromise(promise): Observable<any> {
    const subject = new Subject<any>();

    promise
      .then(res =>{
        subject.next(res);
        subject.complete();
      },
        err => {
          subject.next(err);
          subject.complete();
        });
    return subject.asObservable();
  }

}
