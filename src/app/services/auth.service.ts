//Angular components
import { Router } from "@angular/router";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

//Config & Environment
import * as Base from '../configs/config';
import { environment } from '../../environments/environment';

//Models
import { RegisterUserModel } from '../modules/models/register-user.model'
import { LoginUserModel } from '../modules/models/login-user.model';

//Others
import { MatDialog } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private userId: string;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient, private router: Router) { }

    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getUserId() {
        return this.userId;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    public testModels(data) {
        return this.http.post(Base.url + '/login', data);
    }

    public getPosts() {
        return this.http.get(Base.url + '/all_ferry');
    }

    public checkLogin(data) {
        return this.http.post(Base.url + '/login', data);
    }

    createUser(name: string, email: string, password: string) {
        const authData: RegisterUserModel = { name: name, email: email, password: password };
        return this.http.post(environment.apiUrl + "/api/user/signup", authData);
    }

    public getContact(data) {
        return this.http.post(Base.url + '/contact_us', data);
    }

    login(email: string, password: string, modal: MatDialog) {
        const authData: LoginUserModel = { email: email, password: password };
        this.http
            .post<{ token: string; expiresIn: number; userId: string }>(
                environment.apiUrl + "/api/user/login",
                authData
            )
            .subscribe(
                response => {
                    const token = response.token;
                    this.token = token;
                    if (token) {
                        const expiresInDuration = response.expiresIn;
                        this.setAuthTimer(expiresInDuration);
                        this.isAuthenticated = true;
                        this.userId = response.userId;
                        this.authStatusListener.next(true);
                        const now = new Date();
                        const expirationDate = new Date(
                            now.getTime() + expiresInDuration * 1000
                        );
                        console.log(expirationDate);
                        this.saveAuthData(token, expirationDate, this.userId);
                        modal.closeAll();
                    }
                },
                error => {
                    this.authStatusListener.next(false);
                }
            );
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.userId = authInformation.userId;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.userId = null;
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(["/"]);
    }

    private setAuthTimer(duration: number) {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date, userId: string) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("userId", userId);
    }

    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userId");
    }

    private getAuthData() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const userId = localStorage.getItem("userId");
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId
        };
    }
}