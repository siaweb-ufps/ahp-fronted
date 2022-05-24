import { Component, OnInit } from '@angular/core';
import { faBookOpenReader, faCheck, faListCheck, faListOl, faListUl, faMemory, faSitemap, faUser,faXmarkSquare } from '@fortawesome/free-solid-svg-icons';
import { ProblemService } from '../../service/problem.service';
import { CriterionService } from '../../service/criterion.service';
import { AlternativeService } from '../../service/alternative.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {
  problem = {
    descripcion: ''
  }
  disabledAlternative:boolean = true;
  disabledCriterion:boolean = true;

  diagrama: string = './assets/images/diagrama.png';
  public data: Array<any> = [];
  public email:any = localStorage.getItem('email');
  idProblema: string | null;

  constructor(
    private criterionService: CriterionService,
    private alternativeService: AlternativeService,
    private problemService: ProblemService,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
  ) {
    this.idProblema = aRouter.snapshot.paramMap.get('idProblema') ;
   }

  ngOnInit(): void {
    if(this.idProblema !== null) {
      this.problemService.getProblem("2cfc671b-da58-4cb5-b10c-6d20b9591345").subscribe(el => {
        this.problem = el
      })
      this.criterionService.getCriterions().subscribe(el => {
        if(el !== null) this.disabledCriterion=false;
      })
      this.alternativeService.getAlternatives().subscribe(el => {
        if(el !== null) this.disabledAlternative=false;
      })
    }
    // this.problemService.getProblemsUser(this.email).subscribe((resp:any)=>{
    //   this.data = resp;
    // })
    console.log(this.idProblema);
  }

  faCheck = faCheck;
  faUser = faUser;
  faSitemap = faSitemap;
  faXmarkSquare=faXmarkSquare;
  faBookOpenReader=faBookOpenReader;
  faListOl=faListOl;
  faListUl=faListUl;
  faListCheck=faListCheck;
}
