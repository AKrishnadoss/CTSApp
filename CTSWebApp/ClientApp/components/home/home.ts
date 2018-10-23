import { Component,OnInit } from '@angular/core';
import {AuthService} from '../../services/AuthService';

@Component({
  templateUrl: './home.html'
})
export class HomeComponent  implements OnInit {
  pageTitle = 'Home Page';
  userName = '';

  isLoggedOn : boolean;
  

  constructor(private _authService: AuthService){
  }

  ngOnInit(){

	this.isLoggedOn = this._authService.getIsLoggedOn();
	this.userName = this._authService.getUserName();
  }
}
