import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    private qualifyService:QulifyService,
    private aRouter: ActivatedRoute,
    private toastr: ToastrService,
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
      })

      this.qualifyService.getPrioritiesAlternatives(this.emailDecisor,this.tokenProblem).subscribe(result=>{
        this.matrizPareadaAlt=result[0]
        this.alternativas = result[2]
        
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
      })
    }

}
