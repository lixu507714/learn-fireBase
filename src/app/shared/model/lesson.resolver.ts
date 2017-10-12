
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Lesson} from "./lesson";
import {Observable} from "rxjs/Observable";

export class LessonResolver implements  Resolve<Lesson> {

  resolve(route: ActivatedRouteSnapshot,
          state:RouterStateSnapshot): Observable<any> {
    return undefined;
  }
}
