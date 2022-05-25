import { Component, OnInit } from '@angular/core';
import { faUser, faEdit, faEye, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { DeciderService } from 'src/app/service/decider.service';
import { TokenService } from 'src/app/service/token.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-list-decider',
  templateUrl: './list-decider.component.html',
  styleUrls: ['./list-decider.component.scss']
})
export class ListDeciderComponent implements OnInit {
  faLeftLong = faLeftLong;
  faUser = faUser;
  faEdit = faEdit;
  faEye = faEye;

  imgLoggedOut:string = "./assets/images/imgLoggedOut.jpg"
  isLogin:any = localStorage.getItem("isLogged");
  isLogged = JSON.parse(this.isLogin);
  public email:any = localStorage.getItem('email');

  // isLogged = true;

  deciders:any[]= []

  constructor(
    private location: Location,
    private tokenService: TokenService,
    private deciderS:DeciderService
    ) { }

  ngOnInit(): void {
    (this.tokenService.getToken())
      ? this.isLogged = true
      : this.isLogged = false;
      this.loadDeciders();
  }

  loadDeciders(){
    this.deciderS.getAllDeciderByUser(this.email).subscribe(deciders=>{
      this.deciders = deciders
    })
  }

  goBack():void {
    this.location.back();
  }

}
