import { Component, OnInit } from '@angular/core';
import { faPlus, faLeftLong, faXmarkSquare, faEye } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProblemService } from 'src/app/service/problem.service';
import { CriterionService } from 'src/app/service/criterion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-criterion',
  templateUrl: './register-criterion.component.html',
  styleUrls: ['./register-criterion.component.scss']
})
export class RegisterCriterionComponent implements OnInit {
  problem = { descripcion: '' };

  cont:number = 0;
  criterions:any[] = [];
  i:number=0;

  faPlus = faPlus;
  faLeftLong = faLeftLong;
  faXmarkSquare = faXmarkSquare;
  faEye = faEye;

  public form!: FormGroup;
  title: string = 'Criterio';
  idProblema: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private criterionService: CriterionService,
    private problemService: ProblemService,
    private aRouter: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,

  ) {
    this.idProblema = aRouter.snapshot.paramMap.get('idProblema');
  }

  ngOnInit(): void {
    if(this.idProblema !== null) {
      this.problemService.getProblem(this.idProblema).subscribe(el => {
        this.problem = el
      })
    }

    if(localStorage.getItem("criterios") !== null){
      this.criterions = JSON.parse(localStorage.getItem("criterios")||"");
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

  sendData() {
    this.criterionService.post(this.idProblema, this.criterions).subscribe(
      (res) => {
        localStorage.removeItem('criterios');
        this.criterions.splice(0, this.criterions.length);
        this.router.navigate(['/register-criterion/',this.idProblema]);
          this.toastr.success('Criterio creado', 'OK', {
            positionClass: 'toast-top-center',
            timeOut: 3000,
          });
    });
  }
 
  addCriterion() {
    this.criterions.push({descripcion:this.form.value.descripcion});
    localStorage.setItem("criterios", JSON.stringify(this.criterions));
    this.form.reset();
  }

  deleteCriterion(i:any) {
    this.criterions.splice(i, 1)
    localStorage.setItem("criterios", JSON.stringify(this.criterions));
  }
}
