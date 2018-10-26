import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/Router';

import {LoggerService} from '../services/LoggerService';
import { AuthService } from '../services/AuthService';
import { CalendarService } from '../services/CalendarService';

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
	AppRoutingModule
  ],
  providers: [AuthService, LoggerService, CalendarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
