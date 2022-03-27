import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logo: string = './assets/images/logo.png';

  menu:any = [
    {name: 'Home', url: 'home', class: 'text-white text-opacity-80 hover:text-opacity-100'},
    {name: 'Demo', url: 'demo', class: 'text-white text-opacity-80 hover:text-opacity-100'},
    {name: 'Contact', url: 'contact', class: 'text-white text-opacity-80 hover:text-opacity-100'},
    {name: 'Registrar', url: 'register', class: 'text-white text-opacity-80 hover:text-opacity-100'},
    {name: 'Ingresar', url: 'login', class: 'duration-100 border border-white hover:bg-white hover:text-indigo-600 text-white py-2 px-4 border border-gray-400 rounded shadow'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
