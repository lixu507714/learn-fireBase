
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Lesson} from "./lesson";
import {Observable} from "rxjs/Observable";
import {LessonsService} from "./lessons.service";
import {Injectable} from "@angular/core";

@Injectable()
export class LessonResolver implements  Resolve<Lesson> {

  constructor(private lessonsService: LessonsService) {

  }

  resolve(route: ActivatedRouteSnapshot,
          state:RouterStateSnapshot): Observable<any> {
    return this.lessonsService.findLessonByUrl(route.params['id'])
      .first();
  }
}
