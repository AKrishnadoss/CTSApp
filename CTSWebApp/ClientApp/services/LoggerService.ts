import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';

@Injectable()
export class LoggerService {
	static instance : LoggerService;

	constructor (){
		if ( LoggerService.instance == null ){
			LoggerService.instance = this;
		}
		return LoggerService.instance;
	}

	log(message : string){
		if ( ! environment.production){
			console.log(message);
		}
	}
}
