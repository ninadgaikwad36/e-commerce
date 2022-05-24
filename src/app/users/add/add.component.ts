import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder,FormGroup, Validators,FormArray } from '@angular/forms'
import { Router } from '@angular/router';
import { urlValidator } from '../custom.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  countries:any = [];
  addForm:any;
  duplicateError:boolean = false;
  message:string = '';
  constructor(private userService:UserService,private fb:FormBuilder,private route:Router) { }

  ngOnInit(): void {
    this.userService.getCountries().subscribe((c) => {
      this.countries = c;
    });

    this.addForm = this.fb.group({
      'name':['',[Validators.required]],
      'email':['',[Validators.required,Validators.email]],
      'password':['',[Validators.required,Validators.minLength(2)]],
      'gender':['m',[Validators.required]],
      'phone':['',[Validators.required]],
      'country':['',[Validators.required]],
      'address':this.fb.group({
        'city':['',[Validators.required]],
        'pin':['',[Validators.required]]
      }),
      'skills':this.fb.array([
        this.fb.group({
          subject: ['',[Validators.required]],
          exp: ['',[Validators.required]]
        })
      ])
      // 'typeOfUrl':[''],
      // 'url':['',[urlValidator]],
      // 'profile':['',[urlValidator]]
    })
  }

  skills() : FormArray {
    return this.addForm.get("skills") as FormArray
  }

  addSkill() {
    this.skills().push(
      this.fb.group({
        subject: ['',[Validators.required]],
        exp: ['',[Validators.required]]
      })
    );
  }

  removeSkill(i:number) {
    this.skills().removeAt(i);
  }

  onSubmit() {
    this.duplicateError = false;
    console.log(this.addForm.value);
    let dataToSend = {
      'name':this.addForm.value.name,
      'email':this.addForm.value.email,
      'password':this.addForm.value.password,
      'phone':this.addForm.value.phone,
      'gender':this.addForm.value.gender,
      'country':this.addForm.value.country,
      'token': Math.random(),
      'address':{
        'city':this.addForm.value.address.city,
        'pin':this.addForm.value.address.pin
      },
      'skills':this.addForm.value.skills
    }
    console.log(dataToSend);
    this.userService.addUser(dataToSend).subscribe((result:any) => {
      result = {
        'status':'success',
        'result': result,
        'message':'duplicate email'
      };

      if(result.status == 'success') {
        //redirect to listing page
        Swal.fire({
          title: 'Success',
          text: 'Submitted successfully',
          icon: 'success',
          // showCancelButton: true,
          confirmButtonText: 'Ok',
          // cancelButtonText: 'No, keep it'
        }).then((result) => {
          this.route.navigateByUrl('users/list');
        });
        
      } else {
        this.duplicateError = true;
        this.message = result.message;
      }
    })
  }

  urlType(type:string) {
    if(type == 'url') {
      this.addForm.get('url').setValidators([Validators.required,urlValidator]);
      this.addForm.get('profile').setValidators([urlValidator]);
    } else {
      this.addForm.get('profile').setValidators([Validators.required,urlValidator]);
      this.addForm.get('url').setValidators([urlValidator]);
    }
    this.addForm.get('profile').updateValueAndValidity();
    this.addForm.get('url').updateValueAndValidity();
  }

}
