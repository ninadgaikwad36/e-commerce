import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
    user:any = {};
  constructor(private route:Router,private auth:AuthService,private toastr: ToastrService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(route.data)
    console.log('data here');
    this.user = this.auth.getUserData();
    console.log(this.user);
    this.user.subscribe((u:any) => {
        if(u.name != undefined) {
            console.log(u);
            this.user = u;
            if(route.data['role'].indexOf(this.user.role) === -1) {
                this.toastr.warning('Page you are trying to access is not accessible for ur role','Access worning');
                this.route.navigateByUrl('dashboard');
            }
        }  
    })
    return true;
  }
  
}
