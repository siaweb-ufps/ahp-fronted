import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProblemService } from 'src/app/service/problem.service';
import { QulifyService } from 'src/app/service/qulify.service';

@Component({
  selector: 'app-qualify',
  templateUrl: './qualify.component.html',
  styleUrls: ['./qualify.component.scss']
})
export class QualifyComponent implements OnInit {

  emailDecisor!:any;
  tokenProblem!:any;
  isValidDecisor=false;
  msg:string="";
  problema!:any;
  criteriosComparados!:any;

  constructor(
    private qualifyService:QulifyService,
    private aRouter: ActivatedRoute,
    private toastr: ToastrService,
    private problemS:ProblemService
    ) {
      this.tokenProblem = aRouter.snapshot.paramMap.get('idProblema');
      this.emailDecisor = aRouter.snapshot.paramMap.get('emailDecisor');
     }

  ngOnInit(): void {
    this.getAccess(this.emailDecisor,this.tokenProblem)
    this.getProblem();
    this.getPairsCriterion();
  }
  public getPairsCriterion(){
    this.qualifyService.getPairsCriterion(this.tokenProblem).subscribe(pairs=>{
      this.criteriosComparados = pairs;
      console.log(pairs);
    })
  }
  public getAccess(email:string,token:string){

    this.qualifyService.getAccessProblem(token,email).subscribe(resp=>{
      
      this.toastr.success(resp.mensaje, "Bienvenido", {
        positionClass: 'toast-top-center',
        timeOut: 3000
       })

       this.isValidDecisor=true;

    },error=>{
      this.msg=error.error.mensaje;
      this.toastr.error(error.error.mensaje, "Acceso denegado", {
        positionClass: 'toast-top-center',
        timeOut: 3000
       })
    })
  }

  getProblem(){
    this.problemS.getProblem(this.tokenProblem).subscribe(problem=>{
      this.problema=problem;
    })
  }

  nums = [
    {id: "9", name: "java"},
    {id: "8", name: "java"},
    {id: "7", name: "java"},
    {id: "6", name: "java"},
    {id: "5", name: "java"},
    {id: "4", name: "java"},
    {id: "3", name: "java"},
    {id: "2", name: "java"},
    {id: "1", name: "java"},
    {id: "2", name: "java"},
    {id: "3", name: "java"},
    {id: "4", name: "java"},
    {id: "5", name: "java"},
    {id: "6", name: "java"},
    {id: "7", name: "java"},
    {id: "8", name: "java"},
    {id: "9", name: "java"},
  ]
}
