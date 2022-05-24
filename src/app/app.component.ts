import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class App1Component {
  title:string = 'test';
  count!:number;
  isDisable:boolean = false;
  data:any;
  className:string = 'my-class'

  constructor() {
    // this.title = '12';
  }

  changeEvent() {
    console.log(this.title);
  }

  keyup(e:any) {
    console.log('keyup fired '+e.target.value);
  }

  divClick() {
    alert('click');
  }
}
