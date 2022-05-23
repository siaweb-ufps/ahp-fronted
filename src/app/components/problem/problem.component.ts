import { Component, OnInit } from '@angular/core';
import { faCheck, faSitemap, faUser,faXmarkSquare } from '@fortawesome/free-solid-svg-icons';
import { ProblemService } from '../../service/problem.service';
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
  diagrama: string = './assets/images/diagrama.png';
  public data: Array<any> = [];
  public email:any = localStorage.getItem('email');
  idProblema: string | null;

  constructor(
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
}
