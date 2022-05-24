import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder,FormGroup, Validators,FormArray } from '@angular/forms'
import { Router,ActivatedRoute } from '@angular/router';
import { urlValidator } from '../custom.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  countries:any = [];
  editForm:any;
  duplicateError:boolean = false;
  message:string = '';
  id:number = 0;
  constructor(private userService:UserService,private fb:FormBuilder,private route:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.getCountries().subscribe((c) => {
      this.countries = c;
    });

    this.editForm = this.fb.group({
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
      ])
      // 'typeOfUrl':[''],
      // 'url':['',[urlValidator]],
      // 'profile':['',[urlValidator]]
    })

    this.activatedRoute.params.subscribe((data:any) => {
      this.id = data.id;
      this.userService.getUser(data.id).subscribe((userData:any) => {
        console.log(userData);
        let d:any = {
          'name': userData.name,
          'email': userData.email,
          'password': userData.password,
          'gender': userData.gender,
          'phone': userData.phone,
          'country': userData.country,
          'address': {
            'city': userData.address.city,
            'pin': userData.address.pin
          }
        }

        let customSkills:any = [];

        if(userData.skills1.length > 0) {
          userData.skills1.forEach((skill:any) => {
            console.log(skill);
            let sk = {
              subject:skill.subject,
              exp:skill.exp
            }
            customSkills.push(sk);
            this.addSkill();
          })
        }
        console.log(customSkills)
        d['skills'] = customSkills;
        this.editForm.setValue(d);
      });
    })
  }

  skills() : FormArray {
    return this.editForm.get("skills") as FormArray
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
    console.log(this.editForm.value);
    let dataToSend = {
      'name':this.editForm.value.name,
      'email':this.editForm.value.email,
      'password':this.editForm.value.password,
      'phone':this.editForm.value.phone,
      'gender':this.editForm.value.gender,
      'country':this.editForm.value.country,
      'token': Math.random(),
      'address':{
        'city':this.editForm.value.address.city,
        'pin':this.editForm.value.address.pin
      },
      'skills':this.editForm.value.skills
    }
    console.log(dataToSend);
    this.userService.updateUser(dataToSend,this.id).subscribe((result:any) => {
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
      this.editForm.get('url').setValidators([Validators.required,urlValidator]);
      this.editForm.get('profile').setValidators([urlValidator]);
    } else {
      this.editForm.get('profile').setValidators([Validators.required,urlValidator]);
      this.editForm.get('url').setValidators([urlValidator]);
    }
    this.editForm.get('profile').updateValueAndValidity();
    this.editForm.get('url').updateValueAndValidity();
  }

}
