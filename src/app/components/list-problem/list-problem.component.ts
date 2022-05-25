import { Component, OnInit } from '@angular/core';
import { ProblemService } from '../../service/problem.service';
import { Subject } from 'rxjs';
import { faEdit, faEye, faXmarkSquare, faPlus, faCheck, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-list-problem',
  templateUrl: './list-problem.component.html',
  styleUrls: ['./list-problem.component.scss']
})
export class ListProblemComponent implements OnInit {
  dtTrigger = new Subject<any>();
  public data: Array<any> = [];
  public email:any = localStorage.getItem('email');
  constructor(
    private location:Location,
    private problemService: ProblemService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.problemService.getProblemsUser(this.email).subscribe((resp:any)=>{
      this.data = resp;
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  deshabilitar(token:string){
    this.problemService.deleteProblem(token).subscribe(rep=>{
      this.toastr.success("Problema inhabilitado", "OK", {
        positionClass: 'toast-top-center',
        timeOut: 3000
       })
       window.location.reload();
    })
  }

  habilitar(token:string){
    this.problemService.activateProblem(token).subscribe(rep=>{
      this.toastr.success("Problema habilitado", "OK", {
        positionClass: 'toast-top-center',
        timeOut: 3000
       })
       window.location.reload();
    })
  }

  goBack():void {
    this.location.back();
  }

  faXmarkSquare = faXmarkSquare;
  faEdit = faEdit;
  faEye = faEye;
  faPlus = faPlus;
  faCheck=faCheck;
  faLeftLong = faLeftLong;
}
