import { Component, OnInit } from '@angular/core';
import { faEdit, faEye, faXmarkSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-problem',
  templateUrl: './list-problem.component.html',
  styleUrls: ['./list-problem.component.scss']
})
export class ListProblemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  faXmarkSquare = faXmarkSquare;
  faEdit = faEdit;
  faEye = faEye;
}
