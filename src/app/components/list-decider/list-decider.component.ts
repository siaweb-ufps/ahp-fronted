import { Component, OnInit } from '@angular/core';
import { faUser, faEdit, faEye  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-decider',
  templateUrl: './list-decider.component.html',
  styleUrls: ['./list-decider.component.scss']
})
export class ListDeciderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  faUser = faUser;
  faEdit = faEdit;
  faEye = faEye;

}
