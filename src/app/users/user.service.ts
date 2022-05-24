import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = "http://localhost:3000/";

  constructor(private http:HttpClient) { }

  getList() {
    return this.http.get(this.baseUrl+'users');
  }

  addUser(data:any) {
    //post
    return this.http.post(this.baseUrl+'users',data);
  }

  getCountries() {
    return this.http.get(this.baseUrl+'countries');
  }

  deleteUser(id:number) {
    return this.http.delete(this.baseUrl+'users/'+id);
  }

  getUser(id:number) {
    return this.http.get(this.baseUrl+'users/'+id);
  }

  updateUser(data:any,id:number) {
    return this.http.put(this.baseUrl+'users/'+id,data);
  }
}
