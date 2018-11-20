var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Injectable } from '@angular/core';
import { LoggerService } from './LoggerService';
import { HttpClient } from '@angular/common/http';
var AuthService = /** @class */ (function () {
    function AuthService(_loggerService, _http) {
        this._loggerService = _loggerService;
        this._http = _http;
        if (AuthService_1.instance == null) {
            AuthService_1.instance = this;
        }
        return AuthService_1.instance;
    }
    AuthService_1 = AuthService;
    AuthService.prototype.setAuthToken = function (token) {
        this.authToken = token;
    };
    AuthService.prototype.getAuthToken = function () {
        return this.authToken;
    };
    AuthService.prototype.setEmail = function (email) {
        this.email = email;
    };
    AuthService.prototype.getEmail = function () {
        return this.email;
    };
    AuthService.prototype.setUserName = function (userName) {
        this.userName = userName;
    };
    AuthService.prototype.getUserName = function () {
        return this.userName;
    };
    AuthService.prototype.getIsLoggedOn = function () {
        if (this.authToken != null && this.authToken.length > 0 && this.expiresBy >= new Date()) {
            this._loggerService.log("getIsLoggedOn() = true");
            return true;
        }
        this._loggerService.log("getIsLoggedOn() = false");
        return false;
    };
    AuthService.prototype.setExpiresBy = function (expiresBy) {
        this.expiresBy = expiresBy;
    };
    AuthService.prototype.getExpiresBy = function () {
        return this.expiresBy;
    };
    AuthService.prototype.hasAccess = function (fnName) {
        return __awaiter(this, void 0, void 0, function () {
            var allowed, item;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        allowed = false;
                        if (!(this.authFunctions == null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.callAuthFunctionsService()
                                .then(function (result) {
                                _this.authFunctions = result;
                                if (_this.authFunctions != null && _this.authFunctions.functions != null && _this.authFunctions.functions.length > 0) {
                                    var item = _this.authFunctions.functions.find(function (x) { return x == fnName; });
                                    if (item != null) {
                                        allowed = true;
                                    }
                                    return allowed;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        if (this.authFunctions != null && this.authFunctions.functions != null && this.authFunctions.functions.length > 0) {
                            item = this.authFunctions.functions.find(function (x) { return x == fnName; });
                            if (item != null) {
                                allowed = true;
                            }
                        }
                        _a.label = 3;
                    case 3:
                        console.log("hasAccess=" + fnName);
                        console.log("allowed=" + allowed);
                        return [2 /*return*/, allowed];
                }
            });
        });
    };
    AuthService.prototype.callAuthFunctionsService = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.authFunctions == null) {
                    promise = new Promise(function () {
                        _this._http.get('/api/ctsuser/authfunctions')
                            .toPromise();
                    });
                    return [2 /*return*/, promise];
                }
                return [2 /*return*/];
            });
        });
    };
    AuthService.prototype.getAuthFunctions = function () {
        return this._http.get('/api/ctsuser/authfunctions');
    };
    var AuthService_1;
    AuthService = AuthService_1 = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [LoggerService,
            HttpClient])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=AuthService.js.map