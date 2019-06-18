import {Injectable, Injector} from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {HttpEvent, HttpRequest, HttpHandler} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private injector: Injector, public auth: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // let authService = this.injector.get(AuthService);
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth.getToken()}`
            }
        });
        return next.handle(request);
    }
}
