import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/Home';
import {AttendanceComponent} from './components/attendance/Attendance';
import { ContactComponent } from './components/contact/Contact';
import { ScoresComponent } from './components/score/Scores';


export const AppRoutes = [
	{ path : "", redirectTo : 'home', pathMatch : 'full'},
	{ path : "attendance",component: AttendanceComponent},
    { path: "home", component: HomeComponent },
    { path: "scores", component: ScoresComponent }
    // TODO: Page not found
    // TODO: Session timed out or Unauthorized access
	//{ path : "contactus", component: ContactComponent}
]

@NgModule ({
	imports : [RouterModule.forRoot(AppRoutes, {useHash : true, enableTracing : false })],
	exports : [RouterModule]
})

export class AppRoutingModule {

}