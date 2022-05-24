import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder,FormGroup, Validators,FormArray } from '@angular/forms'
import { Router,ActivatedRoute } from '@angular/router';
import { urlValidator } from '../custom.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  @Input() user:any;
  @Output() dataUpdated:EventEmitter<any> = new EventEmitter<any>(); 
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
    });
  }

  ngOnChanges(change:any) {
    console.log('chngae');
    console.log(change);
    if(change['user']['currentValue'] != undefined && change['user']['currentValue']['name'] != undefined) {
      console.log('hetreewe');
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
      });

      let d:any = {
        'name': this.user.name,
        'email': this.user.email,
        'password': this.user.password,
        'gender': this.user.gender,
        'phone': this.user.phone,
        'country': this.user.country,
        'address': {
          'city': this.user.address.city,
          'pin': this.user.address.pin
        }
      }

      let customSkills:any = [];
      console.log(this.user)
      if(this.user.skills.length > 0) {
        this.user.skills.forEach((skill:any) => {
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
      console.log(d);
      this.editForm.setValue(d);
    }
  }

  skills() : FormArray {
    return this.editForm.get("skills") as FormArray
  }

  addSkill() {
    console.log('add s');
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
    this.userService.updateUser(dataToSend,this.user.id).subscribe((result:any) => {
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
          // this.route.navigateByUrl('users/list');
          this.dataUpdated.emit(true);
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
