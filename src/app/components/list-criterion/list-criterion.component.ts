import { Component, OnInit } from '@angular/core';
import { faEdit, faEye, faXmarkSquare, faPlus, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { CriterionService } from '../../service/criterion.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-criterion',
  templateUrl: './list-criterion.component.html',
  styleUrls: ['./list-criterion.component.scss']
})
export class ListCriterionComponent implements OnInit {
  faLeftLong = faLeftLong;
  faXmarkSquare = faXmarkSquare;
  faEdit = faEdit;
  faEye = faEye;
  faPlus = faPlus;
  idProblema: string | null;


  public data: Array<any> = [];

  constructor(
    private aRouter: ActivatedRoute,
    private location: Location,
    private criterionService: CriterionService,
    private toastr: ToastrService,
  ) {
    this.idProblema = aRouter.snapshot.paramMap.get('idProblema') ;
  }

  ngOnInit(): void {
    this.criterionService.getCriterions(this.idProblema).subscribe((resp:any)=>{
      this.data = resp;
    })
  }

  goBack():void {
    this.location.back();
  }

}
