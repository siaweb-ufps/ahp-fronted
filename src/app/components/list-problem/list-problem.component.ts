import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../../service/problem.service';
import { Subject } from 'rxjs';
import { faEdit, faEye, faXmarkSquare } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
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
  public email:any = localStorage.getItem('email');
  constructor(
    private problemService: ProblemService,
    private toastr: ToastrService,
    // private tokenS:TokenService,
    // private router : Router,
  ) { }

  ngOnInit(): void {
    
    this.problemService.getProblemsUser(this.email).subscribe((resp:any)=>{
      this.data = resp;
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  eliminar(idProblema:string){
    this.problemService.deleteProblem(idProblema).subscribe(rep=>{
      this.toastr.success("Problema eliminado", "OK", {
        positionClass: 'toast-top-center',
        timeOut: 3000
       })
       window.location.reload();
    })
  }

  faXmarkSquare = faXmarkSquare;
  faEdit = faEdit;
  faEye = faEye;
}
