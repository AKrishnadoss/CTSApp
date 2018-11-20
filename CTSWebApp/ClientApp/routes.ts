import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/Home';
import {AttendanceComponent} from './components/attendance/Attendance';
//import { ContactComponent } from './components/contact/Contact';
import { ScoresComponent } from './components/score/Scores';
import { LoggedOutComponent } from './components/loggedOut/loggedOut';
import { AccessDeniedComponent } from './components/accessDenied/accessDenied';


export const AppRoutes = [
	{ path : "", redirectTo : 'home', pathMatch : 'full'},
	{ path : "attendance",component: AttendanceComponent},
    { path: "home", component: HomeComponent },
    { path: "scores", component: ScoresComponent },
    { path: "loggedOut", component: LoggedOutComponent },
    { path: "accessDenied", component: AccessDeniedComponent },
    { path: "**", redirectTo: 'home', pathMatch: 'full' }
    
    // TODO: Session timed out or Unauthorized access
	//{ path : "contactus", component: ContactComponent}
]

@NgModule ({
	imports : [RouterModule.forRoot(AppRoutes, {useHash : true, enableTracing : false })],
	exports : [RouterModule]
})

export class AppRoutingModule {

}