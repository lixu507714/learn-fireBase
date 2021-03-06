import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "angularfire2";
import { firebaseConfig } from "../environments/firebase.config";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AppComponent } from './app.component';
import { AngularFireAuthModule } from "angularfire2/auth";
import { HomeComponent } from "./home/home.component";
import { LessonsService } from "./shared/model/lessons.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { LessonsListComponent } from './lessons-list/lessons-list.component';
import { RouterModule } from "@angular/router";
import { routerConfig } from "./router.config";
import { TopMenuComponent } from './top-menu/top-menu.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesService } from "./shared/model/courses.service";
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { SafeUrlPipe } from './shared/safe-url.pipe';
import { NewLessonComponent } from './new-lesson/new-lesson.component';
import { LessonFromComponent } from './lesson-from/lesson-from.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import {LessonResolver} from "./shared/model/lesson.resolver";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthService} from "./shared/security/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LessonsListComponent,
    TopMenuComponent,
    CoursesComponent,
    CourseDetailComponent,
    LessonDetailComponent,
    SafeUrlPipe,
    NewLessonComponent,
    LessonFromComponent,
    EditLessonComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routerConfig),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LessonsService,CoursesService, LessonResolver, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
