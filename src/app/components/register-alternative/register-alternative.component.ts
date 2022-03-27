import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-alternative',
  templateUrl: './register-alternative.component.html',
  styleUrls: ['./register-alternative.component.scss']
})
export class RegisterAlternativeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  textarea:any = {
    title: 'Descripción',
    name: 'description',
    placeholder: 'Lorem ipsum',
  };

}
