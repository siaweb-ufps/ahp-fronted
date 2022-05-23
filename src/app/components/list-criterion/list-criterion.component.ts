import { Component, OnInit } from '@angular/core';
import { faEdit, faEye, faXmarkSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CriterionService } from '../../service/criterion.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-criterion',
  templateUrl: './list-criterion.component.html',
  styleUrls: ['./list-criterion.component.scss']
})
export class ListCriterionComponent implements OnInit {
  faXmarkSquare = faXmarkSquare;
  faEdit = faEdit;
  faEye = faEye;
  faPlus = faPlus;

  public data: Array<any> = [];

  constructor(
    private criterionService: CriterionService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.criterionService.getCriterions().subscribe((resp:any)=>{
      this.data = resp;
    })
  }

}
