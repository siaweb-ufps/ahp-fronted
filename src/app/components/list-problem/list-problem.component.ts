import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../../service/problem.service';
import { Subject } from 'rxjs';
import { faEdit, faEye, faXmarkSquare } from '@fortawesome/free-solid-svg-icons';
// import { TokenService } from 'src/app/service/token.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-list-problem',
  templateUrl: './list-problem.component.html',
  styleUrls: ['./list-problem.component.scss']
})
export class ListProblemComponent implements OnInit {
  dtTrigger = new Subject<any>();
  // public data: any[]=[];
  public data: Array<any> = [];

  constructor(
    private problemService: ProblemService,
    // private tokenS:TokenService,
    // private router : Router,
  ) { }

  ngOnInit(): void {
    this.problemService.getProblems().subscribe((resp:any)=>{
      console.log(resp);
      this.data = resp;
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  faXmarkSquare = faXmarkSquare;
  faEdit = faEdit;
  faEye = faEye;
}
