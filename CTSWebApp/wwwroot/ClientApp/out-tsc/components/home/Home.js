var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AuthService } from '../../services/AuthService';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(_authService) {
        this._authService = _authService;
        this.pageTitle = 'Home Page';
        this.userName = '';
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.isLoggedOn = this._authService.getIsLoggedOn();
        this.userName = this._authService.getUserName();
        this.CarouselImages = [
            { src: "/img/Carousel-1.jpg", alt: 'First', slideTo: "0" },
            { src: "/img/Carousel-2.jpg", alt: 'Second', slideTo: "1" },
            { src: "/img/Carousel-3.jpg", alt: 'Third', slideTo: "2" },
            { src: "/img/Carousel-4.jpg", alt: 'Fourth', slideTo: "3" },
            { src: "/img/Carousel-5.jpg", alt: 'Fifth', slideTo: "4" }
        ];
    };
    HomeComponent = __decorate([
        Component({
            templateUrl: './home.html'
        }),
        __metadata("design:paramtypes", [AuthService])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=Home.js.map