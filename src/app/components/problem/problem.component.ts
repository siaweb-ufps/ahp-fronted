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
      this.problemService.getProblem(this.idProblema).subscribe(el => {
        this.problem = el
      })
      this.criterionService.getAllCriterions().subscribe(el => {
        if(el !== null) this.disabledCriterion=false;
      })
      this.alternativeService.getAllAlternatives().subscribe(el => {
        if(el !== null) this.disabledAlternative=false;
      })
    }
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
