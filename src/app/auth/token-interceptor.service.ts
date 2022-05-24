import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  avoidInterceptor = ['users?email='];
  constructor(private router: Router, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let skipToken = false;
    this.avoidInterceptor.forEach((u) => {
      if(req.url.indexOf(u) !== -1) {
        skipToken = true;
      }
    });
    let token = localStorage.getItem('token');
    if(token && !skipToken) {
      // let separator = "?";
      // if(req.url.indexOf('?') !== -1) {
      //   separator = '&';
      // }
      // req = req.clone({'url': req.url+separator+'test=something'})
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    }
    return next.handle(req);
  }
}
