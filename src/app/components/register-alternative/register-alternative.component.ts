import { Component, OnInit } from '@angular/core';
import { faPlus, faLeftLong, faXmarkSquare, faEye } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProblemService } from 'src/app/service/problem.service';
import { AlternativeService } from 'src/app/service/alternative.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-alternative',
  templateUrl: './register-alternative.component.html',
  styleUrls: ['./register-alternative.component.scss']
})
export class RegisterAlternativeComponent implements OnInit {
  problem = { descripcion: '' };

  cont:number = 0;
  alternatives:any[] = [];
  i:number=0;

  faPlus = faPlus;
  faLeftLong = faLeftLong;
  faXmarkSquare = faXmarkSquare;
  faEye = faEye;

  public form!: FormGroup;
  title: string = 'Alternativa';
  idProblema: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private alternativeService: AlternativeService,
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
    console.log('id register-alternative: ', this.idProblema);
    

    if(localStorage.getItem("alternativas") !== null){
      this.alternatives = JSON.parse(localStorage.getItem("alternativas")||"");
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
    this.alternativeService.post(this.idProblema, this.alternatives).subscribe(
      (res) => {
        localStorage.removeItem('alternativas');
        this.alternatives.splice(0, this.alternatives.length);
        this.router.navigate(['/list-alternative/',this.idProblema]);
          this.toastr.success('Alternativa creada', 'OK', {
            positionClass: 'toast-top-center',
            timeOut: 3000,
          });
    });
  }
 
  addAlternative() {
    this.alternatives.push({descripcion:this.form.value.descripcion});
    localStorage.setItem("alternativas", JSON.stringify(this.alternatives));
    this.form.reset();
  }

  deleteAlternative(i:any) {
    this.alternatives.splice(i, 1)
    localStorage.setItem("alternativas", JSON.stringify(this.alternatives));
  }
}
