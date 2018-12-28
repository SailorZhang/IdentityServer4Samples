import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RebarInterceptor implements HttpInterceptor {
    private storage: any;
    constructor() {
        this.storage = localStorage;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq: any = req;
        if (!req.headers.has('Authorization')) {
            authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.getToken()) });
        }
        return next.handle(authReq);
    }

    private getToken(): string {

        const item = this.storage.getItem('access_token');
        if (item && item !== 'undefined') {
            return this.storage.getItem('access_token');
        }

    }
}
