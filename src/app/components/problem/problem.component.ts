import { Component, OnInit } from '@angular/core';
import { faCheck, faSitemap, faUser,faXmarkSquare } from '@fortawesome/free-solid-svg-icons';
import { ProblemService } from '../../service/problem.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {
  diagrama: string = './assets/images/diagrama.png';
  public data: Array<any> = [];
  public email:any = localStorage.getItem('email');

  constructor(
    private problemService: ProblemService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.problemService.getProblemsUser(this.email).subscribe((resp:any)=>{
      this.data = resp;
      console.log(this.data);
      
    })
  }

  faCheck = faCheck;
  faUser = faUser;
  faSitemap = faSitemap;
  faXmarkSquare=faXmarkSquare;
}
