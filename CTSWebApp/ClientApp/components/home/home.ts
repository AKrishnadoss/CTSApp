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

	this.CarouselImages = [
		{src :"/img/Carousel-1.jpg", alt :'First', slideTo:"0"},
		{src :"/img/Carousel-2.jpg", alt :'Second', slideTo:"1"},
		{src :"/img/Carousel-3.jpg", alt :'Third', slideTo:"2"},
		{src :"/img/Carousel-4.jpg", alt :'Fourth', slideTo:"3"},
		{src :"/img/Carousel-5.jpg", alt :'Fifth', slideTo:"4"}
	]
  }
}
