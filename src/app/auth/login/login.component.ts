import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userNamePassError:boolean = false;
  constructor(private authService:AuthService,private route:Router) { }

  ngOnInit(): void {
  }

  loginData(data:any) {
    console.log(data);
    console.log(data.valid);
    this.userNamePassError = false;
    if(data.valid) {
      let dataTobeSend = {
        'email':data.value['username'],
        'password':data.value['pasword']
      }
      this.authService.login(dataTobeSend).subscribe((user:any) => {
        console.log(user.length);
        if(user.length == 1) {
          localStorage.setItem('token',user[0]['token'])
          this.authService.setUserData(user[0]);
          this.route.navigateByUrl('/dashboard');
        } else {
          this.userNamePassError = true;
        }

      })
      console.log(data.value);
      //data will be send to api call which will check if this user is valid or not
    }
  }

}
