import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from './../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  modalRef?: BsModalRef;
  usersList:any = [];
  isAccessible:boolean = false;
  n:number = 232.2001;

  sub:any;

  d:any = Date();

  userData:any = {};

  c:number = 123;

  constructor(private userService:UserService,private aR:ActivatedRoute,private route:Router,private auth:AuthService,private modalService: BsModalService) { }

  ngOnInit(): void {
    this.usersList = this.aR.snapshot.data['users'];
    let roles:any = ['SuperAdmin'];
    this.sub = this.auth.getUserData().subscribe((uData:any) => {
      console.log('subscription');
      if(uData.name != undefined) {
        console.log(uData.role);
        if(roles.indexOf(uData.role) === -1) {
          this.isAccessible = false;
        } else {
          this.isAccessible = true;
        }
      }
    });
  }

  delete(id:number) {
    Swal.fire({
      title: 'Delete',
      text: 'Are u sure u want to delete this record',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      console.log(result);
      if(result.isConfirmed) {
        this.userService.deleteUser(id).subscribe((result) => {
          this.getusers();
        });
      }
    });

    
  }

  edit(id:number) {
    this.route.navigate(['users','edit',id]);
  }

  getusers() {
    this.userService.getList().subscribe((list) => {
      this.usersList = list;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  submit() {
    this.usersList = [];
    //after api success u need hide
    this.modalRef?.hide();
    this.getusers();
  }

  view(user:any) {
    this.userData = user;
  }

  notifyUpdate(data:any) {
    console.log(data);
    if(data) {
      this.userData = {};
      this.getusers();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    console.log('destroy called');
  }
}

import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'cap'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: any) {
    console.log(value);
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
