import { Injectable } from "@angular/core";
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router'
import { AuthService } from "../services/auth.service";



@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
    constructor(private router: Router,
        private auth: AuthService){

    }
    headers = new Headers({
        'Content-Type': 'application/json',
        'Token': localStorage.getItem("Token")
    });
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // console.log("intercepted request ... ");

        // Clone the request to add the new header.
        const token: string = localStorage.getItem('id_token');
        const authReq = req.clone({
                      setHeaders: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                      }
                    });

        // console.log("Sending request with new header now ...");

        //send the newly created request
        return next.handle(authReq)
            .catch(err => {
                // onError
                console.log(err);
                if (err instanceof HttpErrorResponse) {
                    console.log(err.status);
                    console.log(err.statusText);
                    if (err.status === 401) {
                        this.auth.logout();
                        this.router.navigate(['/user/login']);
                    }
                }
                return Observable.throw(err);
            }) as any;
    }
}


