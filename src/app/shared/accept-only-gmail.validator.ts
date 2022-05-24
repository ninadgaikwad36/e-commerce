import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms'
import { Directive, OnInit, forwardRef } from '@angular/core';
 
 
@Directive({
  selector: '[acceptOnlyGmail]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: acceptOnlyGmailValidatorDirective, multi: true }
  ]
})
export class acceptOnlyGmailValidatorDirective implements Validator, OnInit {
 
  ngOnInit() {
  }
 
  validate(c: FormControl):any {
    console.log(c);
    let value = c.value;
    console.log(c.errors);
    if( value != '' && (c.errors == null || c.errors['acceptOnlyGmail']) && value != null) {
        let result = value.includes("gmail.com");
        console.log(result);
        console.log(value);
        if(!result) {
            console.log('oinm');
            return {'acceptOnlyGmail':true};
        }
    }
    return null;
  }
}