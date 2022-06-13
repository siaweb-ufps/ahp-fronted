import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  criterios!:any;
  puntajes:any[] = [];


  constructor(
    private qualifyService:QulifyService,
    private aRouter: ActivatedRoute,
    private router: Router,
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
    this.getCriterios();
    
  }

  public lastQualifies(){
    this.qualifyService.getQualifysCriterions(this.emailDecisor,this.tokenProblem).subscribe(total=>{
      console.log(total);
      for (let i = 0; i < this.puntajes.length; i++) {
        let totalE = total[i];
        let copiaPuntaje = {
          idPuntuacion:totalE.idPuntuacion,
          puntuacionCriterio:totalE.puntuacionCriterio,
          valor:totalE.valor,
          decisor:{
            email:this.emailDecisor
          }
        }
          this.puntajes[i] = copiaPuntaje;
      }
      console.log(this.puntajes);
    },error=>{

    })
  }

  public cambiarPuntaje(valor:number, idPuntaje:number){
    for (let i = 0; i < this.puntajes.length; i++) {
      let puntaje = this.puntajes[i];
      if(puntaje.puntuacionCriterio.idPuntuacionDecisor == idPuntaje){
        let copiaPuntaje = null;
        if(puntaje.idPuntuacion!=null){
          copiaPuntaje = {
            idPuntuacion:puntaje.idPuntuacion,
            puntuacionCriterio:puntaje.puntuacionCriterio,
            valor:valor,
            decisor:{
              email:puntaje.decisor.email
          }
        }
        }else{
          copiaPuntaje = {
            puntuacionCriterio:puntaje.puntuacionCriterio,
            valor:valor,
            decisor:{
              email:puntaje.decisor.email
          }
        }
        }
      console.log(this.puntajes);   
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
          idPuntuacion:null,
          puntuacionCriterio:this.criteriosComparados[i].idPuntuacionDecisor,
          valor:-1,
          decisor:{
            email:this.emailDecisor
          }
        })
      }
      this.lastQualifies();
    })
  }

  public guardarPuntajes(){
    if(!this.isQualify()){
      this.toastr.warning("Por favor, rellena todos los campos", "", {
        positionClass: 'toast-top-center',
        timeOut: 3000
       })
    }else{
      console.log(this.puntajes);
      this.qualifyService.saveQualifies(this.puntajes).subscribe(
        (resp)=>{
          this.router.navigate(["/qualify-alternatives",this.tokenProblem,this.emailDecisor]);
          this.toastr.success(resp.mensaje, "Calificación de criterios guardado", {
            positionClass: 'toast-top-center',
            timeOut: 3000
          })
        },
        (error) => {
          this.toastr.error(error.txt, "Error al guardar Calificación de criterios ", {
            positionClass: 'toast-top-center',
            timeOut: 3000
           })
        }
      )
    }
    
  }

  public getCriterios(){
    this.qualifyService.getCriterionProblem(this.tokenProblem).subscribe(criterios=>{
      this.criterios=criterios;
      for(let i = 0; i < this.criterios.length; i++) {
        
      }
    })
  }

  public isQualify():boolean{
      for (let i = 0; i < this.puntajes.length; i++) {
        const element = this.puntajes[i];
        if(element.valor== (-1)){
          return false;
        }
      }
      return true;
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

  isSameValue(idPuntuacion:number,value:any):boolean{
    value = value.toFixed(6);
    for (let i = 0; i < this.puntajes.length; i++) {
      const element = this.puntajes[i];
      if(element.puntuacionCriterio.idPuntuacionDecisor == idPuntuacion && element.valor==value){
        return true;
      }
      
    }
    return false;
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
