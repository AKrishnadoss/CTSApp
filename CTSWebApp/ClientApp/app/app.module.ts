import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/Router';
import { HttpModule } from '@angular/http';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoggerService } from '../services/LoggerService';
import { AuthInterceptor } from '../interceps/AuthInterceptor';
import { AuthService } from '../services/AuthService';
import { CalendarService } from '../services/CalendarService';
import { GradeService } from '../services/GradeService';
import { TeacherService } from '../services/TeacherService';
import { StudentService } from '../services/StudentService';


import { AppComponent } from './app.component';
import {AppRoutingModule} from '../routes';
import {HomeComponent} from '../components/home/Home';
import {ContactComponent} from '../components/contact/Contact'
import {AttendanceComponent} from '../components/attendance/Attendance';
import { ScoresComponent } from '../components/score/Scores';
import { LoggedOutComponent } from '../components/loggedOut/loggedOut';
import { AccessDeniedComponent } from '../components/accessDenied/accessDenied';


@NgModule({
  declarations: [
    AppComponent,
	HomeComponent,
	AttendanceComponent,
      ContactComponent,
      ScoresComponent,
      LoggedOutComponent,
      AccessDeniedComponent
  ],
  imports: [
      BrowserModule,
      HttpModule,
      HttpClientModule,
	  FormsModule, 
	  ReactiveFormsModule,
	  AppRoutingModule
  ],
    providers: [AuthService, LoggerService, CalendarService, GradeService, TeacherService, StudentService,
		{provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
