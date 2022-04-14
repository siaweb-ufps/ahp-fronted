import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/service/token.service';
import { ProblemService } from 'src/app/service/problem.service';

@Component({
  selector: 'app-register-problem',
  templateUrl: './register-problem.component.html',
  styleUrls: ['./register-problem.component.scss'],
})
export class RegisterProblemComponent implements OnInit {
  public form!: FormGroup;
  title:string = 'Registrar problema';
  btn:string = 'Agregar'; 
  id: string | null;  

  constructor(
    private problemService: ProblemService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute,
  ) {
    this.id = aRouter.snapshot.paramMap.get('idAliado');
  }
  ngOnInit(): void {}

  input:any = {
    title: 'Título del problema',
    name: 'problem',
    placeholder: 'Lorem ipsum',
    type: 'text',
  };
  
  textarea:any = {
    title: 'Descripción',
    name: 'description',
    placeholder: 'Lorem ipsum',
  };

  sendData() {
  }

  public loaderToken() {
    if (this.tokenService.getToken()) {
      if(this.tokenService.getAuthorities().length < 2){
      this.router.navigateByUrl("/");
      }
    } else {
      this.router.navigateByUrl("/");
    }
  }
}
