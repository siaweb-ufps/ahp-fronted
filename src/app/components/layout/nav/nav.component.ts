import { Component, OnInit } from '@angular/core';
import { faArrowRightFromBracket, faChartColumn, faUser, faXmarkSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  logo:any = './assets/images/min-logo-white.png';

  constructor() { }
  
  ngOnInit(): void {
  }
  faUser = faUser;
  faXmarkSquare = faXmarkSquare;
  faChartColumn = faChartColumn;
  faArrowRightFromBracket = faArrowRightFromBracket;

}
