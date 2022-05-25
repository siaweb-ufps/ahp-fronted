import { Component, OnInit } from '@angular/core';
import { AlternativeService } from '../../service/alternative.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { faEdit, faEye, faXmarkSquare, faPlus, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-alternative',
  templateUrl: './list-alternative.component.html',
  styleUrls: ['./list-alternative.component.scss']
})
export class ListAlternativeComponent implements OnInit {
  faLeftLong = faLeftLong;
  faXmarkSquare = faXmarkSquare;
  faEdit = faEdit;
  idProblema: string | null;
  faEye = faEye;
  faPlus = faPlus;
  
  public data: Array<any> = [];
  
  constructor(
    private aRouter: ActivatedRoute,
    private location: Location,
    private alternativeService: AlternativeService,
    private toastr: ToastrService,
    ) {
      this.idProblema = aRouter.snapshot.paramMap.get('idProblema') ;
    }

  ngOnInit(): void {
    this.alternativeService.getAlternatives(this.idProblema).subscribe((resp:any)=>{
      this.data = resp;
    })
  }

  goBack():void {
    this.location.back()
  }

}
