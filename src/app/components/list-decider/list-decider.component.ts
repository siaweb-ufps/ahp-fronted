import { Component, OnInit } from '@angular/core';
import { faUser, faEdit, faEye  } from '@fortawesome/free-solid-svg-icons';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-list-decider',
  templateUrl: './list-decider.component.html',
  styleUrls: ['./list-decider.component.scss']
})
export class ListDeciderComponent implements OnInit {
  imgLoggedOut:string = "./assets/images/imgLoggedOut.jpg"
  isLogin:any = localStorage.getItem("isLogged");
  isLogged = JSON.parse(this.isLogin);
  // isLogged = true;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    (this.tokenService.getToken())
      ? this.isLogged = true
      : this.isLogged = false;
  }

  faUser = faUser;
  faEdit = faEdit;
  faEye = faEye;

}
