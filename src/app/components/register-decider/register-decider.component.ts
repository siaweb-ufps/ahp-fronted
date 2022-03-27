import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-decider',
  templateUrl: './register-decider.component.html',
  styleUrls: ['./register-decider.component.scss']
})
export class RegisterDeciderComponent implements OnInit {

  constructor() { }

  inputs:any = [
    {
      title: 'Nombre de usuario',
      name: 'name',
      placeholder: 'Jean Álvarez',
      type: 'text',
    },
    {
      title: 'Correo electrónico',
      name: 'email',
      placeholder: 'jean@gmail.com',
      type: 'email',
    }
  ]

  ngOnInit(): void {
  }

}
