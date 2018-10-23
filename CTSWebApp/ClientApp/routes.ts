﻿import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/Home';
import {AttendanceComponent} from './components/attendance/Attendance';
import {ContactComponent} from './components/contact/Contact';

export const AppRoutes = [
	{ path : "", redirectTo : 'home', pathMatch : 'full'},
	{ path : "attendance",component: AttendanceComponent},
	{ path : "home", component: HomeComponent},
	{ path : "contactus", component: ContactComponent}
]

@NgModule ({
	imports : [RouterModule.forRoot(AppRoutes, {useHash : true, enableTracing : false })],
	exports : [RouterModule]
})

export class AppRoutingModule {

}