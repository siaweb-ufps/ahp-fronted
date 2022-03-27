import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;
  image:any = 'https://images.unsplash.com/photo-1634087990018-415aeb951215?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80';

  constructor(
    public formulario:FormBuilder, 
  ) {
    this.formGroup = this.formulario.group({
      email:[''],
      password:[''],
    })
  }

  ngOnInit(): void {
  }

}
