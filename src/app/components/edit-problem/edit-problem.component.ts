import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-problem',
  templateUrl: './edit-problem.component.html',
  styleUrls: ['./edit-problem.component.scss']
})
export class EditProblemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  input:any = {
    title: 'Título del problema',
    name: 'problem',
    placeholder: 'Lorem ipsum',
    type: 'text',
  };
  
  textarea:any = {
    title: 'Descripción',
    name: 'description',
    placeholder: 'Lorem ipsum',
  };
}
