import { Component, OnInit } from '@angular/core';
import { faCheck, faSitemap, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {
  diagrama: string = './assets/images/diagrama.png';

  constructor() { }

  ngOnInit(): void {
  }

  faCheck = faCheck;
  faUser = faUser;
  faSitemap = faSitemap;
}
