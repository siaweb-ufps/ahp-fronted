import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QulifyService } from 'src/app/service/qulify.service';
import {Location} from '@angular/common';
import { faUser, faEdit, faEye, faLeftLong } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-total-results',
  templateUrl: './total-results.component.html',
  styleUrls: ['./total-results.component.scss']
})
export class TotalResultsComponent implements OnInit {
  criterios:any;
  faLeftLong = faLeftLong;
  matrizPareadaCrit:any;
  criterioGanador:any;
  matrizPareadaAlt:any;
  alternativas:any;
  procedimientoCrit:any;
  procedimientoAlt:any;
  actualPage = 1;

  percentCritMax:number = 0
  percentAltMax:number = 0


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

  estadisticasCritPorDecisor:any[]=[]
  estadisticasAltPorDecisor:any[]=[]


  constructor(
    private qualifyService:QulifyService,
    private aRouter: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private location: Location,
    ) {
      this.tokenProblem = aRouter.snapshot.paramMap.get('idProblema');
      this.emailDecisor = aRouter.snapshot.paramMap.get('emailDecisor');
    }
    
    ngOnInit(): void {
      this.loadResults();
    }
    ngAfterViewInit():void {
    }


    isNumber(val:any): boolean { return typeof val === 'number'; }
    isString(val:any): boolean { return typeof val === 'string'; }

    loadResults(){
      this.qualifyService.getPrioritiesCriterionsTotal(this.tokenProblem).subscribe(result=>{
        this.matrizPareadaCrit=result[0]
        this.criterios = result[2]
        this.procedimientoCrit = result[3]
        this.estadisticasCritPorDecisor = result[5]
        let valores = []

        for (let i = 0; i < this.criterios.length; i++) {
          valores.push(this.criterios[i][1])
        }

        this.percentCritMax = Math.max(...valores)
        this.thead=(result[0][0]);
        this.tr=[]
        this.criterioGanador = result[4].descripcion;
        for (let i = 1; i < result[0].length; i++) {
          this.tr.push(result[0][i])
        }
      }, error=>{
        this.toastr.warning(error.error.mensaje, "Warning", {
          positionClass: 'toast-top-center',
          timeOut: 3000
         })

         this.delay(3000);
         this.redirigir();
         return;
      } )

      this.qualifyService.getPrioritiesAlternativesTotal(this.tokenProblem).subscribe(result=>{
        this.matrizPareadaAlt=result[0]
        this.alternativas = result[2]
        this.procedimientoAlt = result[3]
        this.estadisticasAltPorDecisor = result[5]
        let valores = []

        for (let i = 0; i < this.alternativas.length; i++) {
          valores.push(this.alternativas[i][1])
        }

        this.percentAltMax = Math.max(...valores)

        this.thead2=(result[0][0]);
        this.tr2=[]
        for (let i = 1; i < result[0].length; i++) {
          this.tr2.push(result[0][i])
        }
      }, error=>{
        this.redirigir();
      })
    }

    redirigir(){
      this.router.navigate(["/problem/"+this.tokenProblem]);
    }

    goBack():void {
      this.location.back();
    }

    delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }

  cambiarPage(actualPage:number){

    if(actualPage==1){
      this.actualPage = 1;
      document.getElementById("step-1")?.removeAttribute("class")
      document.getElementById("step-2")?.removeAttribute("class")

      document.getElementById("step-1")?.setAttribute("class","transform hover:scale-110 duration-300 cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white text-2xl")

      document.getElementById("step-2")?.setAttribute("class","transform hover:scale-110 duration-300 cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-indigo-200 text-indigo-400 text-2xl")
    }
    else{
      this.actualPage = 2;
      document.getElementById("step-1")?.removeAttribute("class")
      document.getElementById("step-2")?.removeAttribute("class")

      document.getElementById("step-2")?.setAttribute("class","transform hover:scale-110 duration-300 cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white text-2xl")

      document.getElementById("step-1")?.setAttribute("class","transform hover:scale-110 duration-300 cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-indigo-200 text-indigo-400 text-2xl")
    }

  }
}

