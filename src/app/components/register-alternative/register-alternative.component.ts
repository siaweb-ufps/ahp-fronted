import { Component, OnInit } from '@angular/core';
import { faPlus, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-alternative',
  templateUrl: './register-alternative.component.html',
  styleUrls: ['./register-alternative.component.scss']
})
export class RegisterAlternativeComponent implements OnInit {
  faLeftLong = faLeftLong;
  faPlus = faPlus;

  cont:number = 0;
  alternatives:any[] = [];
  i:number=0;

  public form!: FormGroup;
  title: string = 'Agregar alternativa';
  id: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private aRouter: ActivatedRoute
  ) {
    this.id = aRouter.snapshot.paramMap.get('idProblema');
  }

  ngOnInit(): void {
    if(this.id!=null){
      this.isEdit();
    }
    this.form = this.formBuilder.group({
      descripcion: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(500)]),
      ],
    });
  }

  textarea:any = {
    title: 'Descripción',
    name: 'description',
    placeholder: 'Lorem ipsum',
  };

  isEdit() {
  }
 
  addAlternative() {
    this.cont++    
    this.alternatives[this.i++] = this.cont;
  }
  deleteAlternative() {
    this.i--
    this.alternatives.shift()
  }

}
