import { Component, OnInit } from '@angular/core';
import { faPlus, faLeftLong, faXmarkSquare, faEye } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-criterion',
  templateUrl: './register-criterion.component.html',
  styleUrls: ['./register-criterion.component.scss']
})
export class RegisterCriterionComponent implements OnInit {
  cont:number = 0;
  criterions:any[] = [
    {id: '1', name: 'hola'},
    {id: '2', name: 'chao'}
  ];
  i:number=0;

  faPlus = faPlus;
  faLeftLong = faLeftLong;
  faXmarkSquare = faXmarkSquare;
  faEye = faEye;

  public form!: FormGroup;
  title: string = 'Agregar criterio';
  idProblema: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private aRouter: ActivatedRoute
  ) {
    this.idProblema = aRouter.snapshot.paramMap.get('idProblema');
  }

  ngOnInit(): void {
    if(this.idProblema!=null){
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

  sendData() {
    const obj = {id:"3", name: "como esta"}
    this.criterions.push(obj)
    // this.problemService.getUser(this.usuario).subscribe((el) => {
    //   this.form.patchValue({
    //     usuario: el,
    //   });
    // });
  }
 
  addCriterion() {
    this.criterions[this.i++] = this.cont;
  }
  deleteCriterion(i:any) {
    console.log(i);
    this.criterions.splice(i, 1);
  }
}
