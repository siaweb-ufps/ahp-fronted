import { Component, OnInit } from '@angular/core';
import { faArrowRightFromBracket, faChartColumn, faRightToBracket, faUser, faXmarkSquare ,faUserDoctor} from '@fortawesome/free-solid-svg-icons';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isLogged:boolean = false;
  logo:any = './assets/images/min-logo-white.png';

  constructor( private tokenService: TokenService ) { }
  
  ngOnInit(): void {
    (this.tokenService.getToken()) 
      ? this.isLogged = true 
      : this.isLogged = false
  }

  onLogOut(): void {
    this.tokenService.logOut();
    // window.location.reload();
  }

  faUser = faUser;
  faUserDoctor = faUserDoctor;
  faXmarkSquare = faXmarkSquare;
  faChartColumn = faChartColumn;
  faRightToBracket = faRightToBracket;
  faArrowRightFromBracket = faArrowRightFromBracket;

}
