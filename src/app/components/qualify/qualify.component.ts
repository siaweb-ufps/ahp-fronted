import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qualify',
  templateUrl: './qualify.component.html',
  styleUrls: ['./qualify.component.scss']
})
export class QualifyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  nums = [
    {id: "9", name: "java"},
    {id: "8", name: "java"},
    {id: "7", name: "java"},
    {id: "6", name: "java"},
    {id: "5", name: "java"},
    {id: "4", name: "java"},
    {id: "3", name: "java"},
    {id: "2", name: "java"},
    {id: "1", name: "java"},
    {id: "2", name: "java"},
    {id: "3", name: "java"},
    {id: "4", name: "java"},
    {id: "5", name: "java"},
    {id: "6", name: "java"},
    {id: "7", name: "java"},
    {id: "8", name: "java"},
    {id: "9", name: "java"},
  ]
}
