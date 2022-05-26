import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProblemService } from 'src/app/service/problem.service';
import { QulifyService } from 'src/app/service/qulify.service';

@Component({
  selector: 'app-qualify-alternatives',
  templateUrl: './qualify-alternatives.component.html',
  styleUrls: ['./qualify-alternatives.component.scss']
})
export class QualifyAlternativesComponent implements OnInit {

  emailDecisor!:any;
  tokenProblem!:any;
  isValidDecisor=false;
  msg:string="";
  problema!:any;
  criteriosComparados!:any;
  alternatives!:any;
  puntajes:any[] = [];

  constructor(
    private qualifyService:QulifyService,
    private aRouter: ActivatedRoute,
    private toastr: ToastrService,
    private problemS:ProblemService,
    ) {
      this.tokenProblem = aRouter.snapshot.paramMap.get('idProblema');
      this.emailDecisor = aRouter.snapshot.paramMap.get('emailDecisor');
     }

  ngOnInit(): void {
    this.getAccess(this.emailDecisor,this.tokenProblem)
    this.getProblem();
    this.getPairsCriterion();
    this.getAlternatives();
  }

  public cambiarPuntaje(valor:number, idPuntaje:number){
    
    for (let i = 0; i < this.puntajes.length; i++) {
      let puntaje = this.puntajes[i];
      if(puntaje.puntuacionCriterio == idPuntaje){
        let copiaPuntaje = {
          puntuacionCriterio:puntaje.puntuacionCriterio,
          valor:valor,
          decisor:{
            email:puntaje.decisor.email
        }
      }
      this.puntajes[i]=copiaPuntaje
      break;
    }
    }
  }

  public getPairsCriterion(){
    this.qualifyService.getPairsCriterion(this.tokenProblem).subscribe(pairs=>{
      this.criteriosComparados = pairs;
      for (let i = 0; i < this.criteriosComparados.length; i++) {
        this.puntajes.push({
          puntuacionCriterio:this.criteriosComparados[i].idPuntuacionDecisor,
          valor:-1,
          decisor:{
            email:this.emailDecisor
          }
        })
      }

    })
  }

  public guardarPuntajes(){
    this.qualifyService.saveQualifies(this.puntajes).subscribe(resp=>{
    })
  }

  public getAlternatives(){
    this.qualifyService.getCriterionProblem(this.tokenProblem).subscribe(el=>{
      this.alternatives=el;
      for(let i = 0; i < this.alternatives.length; i++) {
        
      }
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
    {id: 9},
    {id: 8},
    {id: 7},
    {id: 6},
    {id: 5},
    {id: 4},
    {id: 3},
    {id: 2},
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
    {id: 8},
    {id: 9},
  ]
}
