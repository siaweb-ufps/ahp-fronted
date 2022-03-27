import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-decider',
  templateUrl: './edit-decider.component.html',
  styleUrls: ['./edit-decider.component.scss']
})
export class EditDeciderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

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

}
