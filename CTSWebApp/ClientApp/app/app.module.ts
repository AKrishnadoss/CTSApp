import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/Router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {LoggerService} from '../services/LoggerService';
import { AuthService } from '../services/AuthService';
import { CalendarService } from '../services/CalendarService';
import { GradeService } from '../services/GradeService';
import { TeacherService } from '../services/TeacherService';


import { AppComponent } from './app.component';
import {AppRoutingModule} from '../routes';
import {HomeComponent} from '../components/home/Home';
import {ContactComponent} from '../components/contact/Contact'
import {AttendanceComponent} from '../components/attendance/Attendance';



@NgModule({
  declarations: [
    AppComponent,
	HomeComponent,
	AttendanceComponent,
	ContactComponent
  ],
  imports: [
      BrowserModule,
      HttpModule,
      HttpClientModule,
	  FormsModule, 
	  ReactiveFormsModule,
	  AppRoutingModule
  ],
    providers: [AuthService, LoggerService, CalendarService, GradeService, TeacherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
