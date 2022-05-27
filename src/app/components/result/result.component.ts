import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProblemService } from 'src/app/service/problem.service';
import { QulifyService } from 'src/app/service/qulify.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  criterios:any;
  matrizPareadaCrit:any;
  criterioGanador:any;
  matrizPareadaAlt:any;
  alternativas:any;

  thead:any = [
    {title: ' '},
    {title: 'Alternativa '},
    {title: 'Alternativa '},
    {title: 'Alternativa '},
  ]

  thead2:any = [
    {title: ' '},
    {title: 'Alternativa '},
    {title: 'Alternativa '},
    {title: 'Alternativa '},
  ]

  b:any=[];
  tr:any[]=[];
  tr2:any[]=[];

  var = this.thead.lenght;
  

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
    private renderer2: Renderer2,
    ) {
      this.tokenProblem = aRouter.snapshot.paramMap.get('idProblema');
      this.emailDecisor = aRouter.snapshot.paramMap.get('emailDecisor');
    }
    
    ngOnInit(): void {
      this.getAccess(this.emailDecisor,this.tokenProblem)
      this.loadResults();
    }
    ngAfterViewInit():void {
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

    isNumber(val:any): boolean { return typeof val === 'number'; }
    isString(val:any): boolean { return typeof val === 'string'; }

    loadResults(){
      this.qualifyService.getPrioritiesCriterions(this.emailDecisor,this.tokenProblem).subscribe(result=>{
        this.matrizPareadaCrit=result[0]
        this.criterios = result[2]
        this.thead=(result[0][0]);
        this.tr=[]
        this.criterioGanador = result[4].descripcion;
        for (let i = 1; i < result[0].length; i++) {
          this.tr.push(result[0][i])
        }
      })

      this.qualifyService.getPrioritiesAlternatives(this.emailDecisor,this.tokenProblem).subscribe(result=>{
        this.matrizPareadaAlt=result[0]
        this.alternativas = result[2]
        this.thead2=(result[0][0]);
        this.tr2=[]
        for (let i = 1; i < result[0].length; i++) {
          this.tr2.push(result[0][i])
        }
      })
    }
    
   
}
