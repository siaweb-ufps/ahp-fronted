import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-criterion',
  templateUrl: './register-criterion.component.html',
  styleUrls: ['./register-criterion.component.scss']
})
export class RegisterCriterionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  textarea:any = {
    title: 'Descripción',
    name: 'description',
    placeholder: 'Lorem ipsum',
  };

}
