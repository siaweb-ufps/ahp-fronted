import { Component, OnInit } from '@angular/core';
import { faEdit, faEye, faXmarkSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AlternativeService } from '../../service/alternative.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-alternative',
  templateUrl: './list-alternative.component.html',
  styleUrls: ['./list-alternative.component.scss']
})
export class ListAlternativeComponent implements OnInit {
  faXmarkSquare = faXmarkSquare;
  faEdit = faEdit;
  faEye = faEye;
  faPlus = faPlus;

  public data: Array<any> = [];

  constructor(
    private alternativeService: AlternativeService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.alternativeService.getAlternatives().subscribe((resp:any)=>{
      this.data = resp;
    })
  }

}
