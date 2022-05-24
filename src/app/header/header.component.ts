import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user:any = {};
  constructor(private auth:AuthService,private route:Router) { }

  ngOnInit(): void {
    let userObs = this.auth.getUserData();

    userObs.subscribe((uData) => {
      console.log(uData);
      this.user = uData;
    })

    console.log(this.user);
  }

  click() {
    console.log(this.auth.getUserData());
  }

  logout() {
    localStorage.removeItem('token');
    this.auth.setUserData({});
    this.route.navigateByUrl('/login');
  }

}
