import { Component, OnInit } from '@angular/core';
import {faUser,faUserEdit} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.scss']
})
export class MyaccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  faUser = faUser;
  faUserEdit = faUserEdit;

}
