import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = "http://localhost:3000/";

  public userObservable = new BehaviorSubject<any>({});  
  public userData = this.userObservable.asObservable();
  constructor(private http:HttpClient) { }


  login(data:any) {
    return this.http.get(this.baseUrl+'users?email='+data.email+'&password='+data.password);
  }

  setUserData(userData:any) {
    this.userObservable.next(userData);
  }

  getUserData() {
    return this.userData;
  }

  getUserByToken(token:string) {
    return this.http.get(this.baseUrl+'users?token='+token);
  }

}
