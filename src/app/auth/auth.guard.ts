import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route:Router,private auth:AuthService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('in guard');
      let user = this.auth.getUserData();
      user.subscribe((u) => {
        console.log(u);
        let token = localStorage.getItem('token');
        if(token == null) {
          this.route.navigateByUrl('/login');
        } else {
          if(u.name == undefined) {
            this.auth.getUserByToken(token).subscribe((usData:any) => {
              console.log(usData);
              this.auth.setUserData(usData[0]);
            });
          } else {
            //u.role
          }
        }
        
      })
      // let token = localStorage.getItem('token');
      // console.log(token);
      // if(token == null) {
      //   this.route.navigateByUrl('/login');
      // }
      return true;
  }
  
}
