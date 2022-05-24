import { AbstractControl } from '@angular/forms';
export function urlValidator(control: AbstractControl) {
    console.log(control.value);
    if (!control.value.startsWith('https')) {
        return { urlValid: true };
    }
    // if(control.value.indexOf(' ') >= 0) {
    //     return { spacePresent: true };
    // }
  return null;
}

