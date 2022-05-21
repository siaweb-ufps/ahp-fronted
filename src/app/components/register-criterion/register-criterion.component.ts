import { Component, OnInit } from '@angular/core';
import { faPlus, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-criterion',
  templateUrl: './register-criterion.component.html',
  styleUrls: ['./register-criterion.component.scss']
})
export class RegisterCriterionComponent implements OnInit {
  cont:number = 0;
  criterions:any[] = [];
  i:number=0;

  faPlus = faPlus;
  faLeftLong = faLeftLong;

  public form!: FormGroup;
  title: string = 'Agregar criterio';
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
 
  addCriterion() {
    this.cont++    
    this.criterions[this.i++] = this.cont;
    console.log(this.cont);
    console.log(this.criterions);
    
    
  }
  deleteCriterion() {
    this.i--
    this.criterions.shift()
  }
}
