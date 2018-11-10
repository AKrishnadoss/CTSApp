import { Component,OnInit } from '@angular/core';
import {AuthService} from '../../services/AuthService';

@Component({
  templateUrl: './home.html'
})
export class HomeComponent  implements OnInit {
  pageTitle = 'Home Page';
  userName = '';

  isLoggedOn : boolean;
  CarouselImages : any[];

  constructor(private _authService: AuthService){
  }

  ngOnInit(){

	this.isLoggedOn = this._authService.getIsLoggedOn();
	this.userName = this._authService.getUserName();

	if ( this.isLoggedOn == false){
		this.resetLoginControls();
	}

	this.CarouselImages = [
		{src :"/img/Carousel-1.jpg", alt :'First', slideTo:"0"},
		{src :"/img/Carousel-2.jpg", alt :'Second', slideTo:"1"},
		{src :"/img/Carousel-3.jpg", alt :'Third', slideTo:"2"},
		{src :"/img/Carousel-4.jpg", alt :'Fourth', slideTo:"3"},
		{src :"/img/Carousel-5.jpg", alt :'Fifth', slideTo:"4"}
	]
  }

  resetLoginControls(){
	var loginLinkElement = document.getElementById("loginLink");
	var logoutLinkElement = document.getElementById("logoutLink");
	var loggedinElement = document.getElementById("loggedInAs");
	if ( loggedinElement != null){
		loggedinElement.innerText = "";
	}
		
	if ( loginLinkElement != null){
		loginLinkElement.style.display = "block";
	}
		
	if ( logoutLinkElement != null){
		logoutLinkElement.style.display = "none";
	}
  }
}
