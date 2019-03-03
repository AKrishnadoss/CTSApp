import { Component, OnInit, PACKAGE_ROOT_URL } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../services/AuthService';
import { LoggerService } from '../../services/LoggerService';

@Component({
  templateUrl: './home.html'
})
export class HomeComponent  implements OnInit {
    pageTitle = 'Home Page';
    appTitle: string;
    userName = '';

    isLoggedOn: boolean;
    isTermScoreEntryAllowed: boolean;
    CarouselImages : any[];

    constructor(private _authService: AuthService,
        private _loggerService: LoggerService,
        private _router: Router) {
  }

  ngOnInit(){

      this.isLoggedOn = this._authService.getIsLoggedOn();
      this.isTermScoreEntryAllowed = false;
      this.userName = this._authService.getUserName();
      this.appTitle = "Cary Tamil School - Attendance and Score System";

      if (this.isLoggedOn == false) {
          this.resetLoginControls();
      }
      else {
          if (this._authService.authFunctions == null) {
              this._loggerService.log("home ts - > getting authFunctions");
              this._authService.getAuthFunctions()
                  .subscribe(result => {
                      this._authService.authFunctions = result;
                      this.enableMenus();
                  },
                      err => {
                          this._loggerService.log("Error occurred : Code=" + err.status + ",Error=" + err.statusText);
                      });
          }
          else {
              this.enableMenus();
          }
      }

	this.CarouselImages = [
		{src :"/img/Carousel-1.jpg", alt :'First', slideTo:"0"},
		{src :"/img/Carousel-2.jpg", alt :'Second', slideTo:"1"},
		{src :"/img/Carousel-3.jpg", alt :'Third', slideTo:"2"},
		{src :"/img/Carousel-4.jpg", alt :'Fourth', slideTo:"3"},
		{src :"/img/Carousel-5.jpg", alt :'Fifth', slideTo:"4"}
      ]

      //this.enableMenus();
  }

    resetLoginControls() {
        var loginLinkElement = document.getElementById("loginLink");
        var logoutLinkElement = document.getElementById("logoutLink");
        var loggedinElement = document.getElementById("loggedInAs");
        if (loggedinElement != null) {
            loggedinElement.innerText = "";
        }

        if (loginLinkElement != null) {
            loginLinkElement.style.display = "block";
        }

        if (logoutLinkElement != null) {
            logoutLinkElement.style.display = "none";
        }
    }

    enableMenus() {
        this._authService.hasAccess("TermScores")
            .then((x) => {
                this.isTermScoreEntryAllowed = x;
            });
    }
}
