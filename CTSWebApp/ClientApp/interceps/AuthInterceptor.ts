import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';

import {AuthService} from '../services/AuthService';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor (private _authService: AuthService){
	
	}

	intercept(req:HttpRequest<any> , next: HttpHandler) : Observable<HttpEvent<any>>{
	
		let authHeader = 'Bearer : ' + this._authService.getAuthToken();

		const headers = new HttpHeaders({
			'Authorization': authHeader
		});

		const authReq = req.clone({headers});
		return next.handle(authReq);

	}
}