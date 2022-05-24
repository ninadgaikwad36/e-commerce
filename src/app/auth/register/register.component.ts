import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  showError:boolean = false;
  test:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  registerData(data:any) {

  }

  cpClicked() {
    alert('radio clicked');
    this.showError = true;
  }

}
