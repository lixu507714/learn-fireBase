import {Route} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CoursesComponent} from "./courses/courses.component";
import {CourseDetailComponent} from "./course-detail/course-detail.component";
import {LessonDetailComponent} from "./lesson-detail/lesson-detail.component";
import {NewLessonComponent} from "./new-lesson/new-lesson.component";
import {EditLessonComponent} from "./edit-lesson/edit-lesson.component";
import {Lesson} from "./shared/model/lesson";
import {LessonResolver} from "./shared/model/lesson.resolver";
export const routerConfig: Route[] = [
  {
    path: "home",
    children:[
      // {
      //   path:':id',
      //   component:LessonDetailComponent
      // },
      {
        path:'',
        component: HomeComponent
      }
    ]
  },
  {
    path: "courses",
    children: [
      {
        path: ':id',
        children: [
          {
            path: '',
            component: CourseDetailComponent
          },
          {
            path: 'new',
            component: NewLessonComponent
          }
        ]
      },
      {
        path: '',
        component: CoursesComponent,
        resolve: {
          lesson: LessonResolver
        }
      }
    ]
  },
  {
    path:"lessons/:id",
    children:[
      {
        path:'',
        component:LessonDetailComponent
      },
      {
        path: 'edit',
        component: EditLessonComponent
      }
    ]
  }
];
