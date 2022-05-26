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

  thead:any = [
    {title: ' '},
    {title: 'Alternativa '},
    {title: 'Alternativa '},
    {title: 'Alternativa '},
    {title: 'Alternativa '},
    {title: 'Alternativa '},
  ]
  tr:any = [
    {
      td1: 'Alterinativa',
      td2: '1',
      td3: '2',
      td4: '3',
      td5: '4',
      td6: '5',
    },
    {
      td1: 'Alterinativa ',
      td2: '1',
      td3: '2',
      td4: '3',
      td5: '4',
      td6: '5',
    },
    {
      td1: 'Alterinativa',
      td2: '1',
      td3: '2',
      td4: '3',
      td5: '4',
      td6: '5',
    },
    {
      td1: 'Alterinativa',
      td2: '1',
      td3: '2',
      td4: '3',
      td5: '4',
      td6: '5',
    },
    {
      td1: 'Alterinativa',
      td2: '1',
      td3: '2',
      td4: '3',
      td5: '4',
      td6: '5',
    },
    {
      td1: 'Alterinativa',
      td2: '1',
      td3: '2',
      td4: '3',
      td5: '4',
      td6: '5',
    },
  ]
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
    }
    ngAfterViewInit():void {
    }
   
}
