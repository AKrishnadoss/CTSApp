var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoggerService } from '../services/LoggerService';
import { AuthInterceptor } from '../interceps/AuthInterceptor';
import { AuthService } from '../services/AuthService';
import { CalendarService } from '../services/CalendarService';
import { GradeService } from '../services/GradeService';
import { TeacherService } from '../services/TeacherService';
import { StudentService } from '../services/StudentService';
import { AppComponent } from './app.component';
import { AppRoutingModule } from '../routes';
import { HomeComponent } from '../components/home/Home';
import { ContactComponent } from '../components/contact/Contact';
import { AttendanceComponent } from '../components/attendance/Attendance';
import { ScoresComponent } from '../components/score/Scores';
import { LoggedOutComponent } from '../components/loggedOut/loggedOut';
import { AccessDeniedComponent } from '../components/accessDenied/accessDenied';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
                { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map