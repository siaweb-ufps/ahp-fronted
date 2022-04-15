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
    this.id = aRouter.snapshot.paramMap.get('problem');
  }
  ngOnInit(): void {
    this.loaderToken();
    this.isEdit();
    this.form = this.formBuilder.group({
      problem: ['', Validators.compose([
        Validators.required,
        Validators.min(100000000),
        Validators.max(9999999999)
      ])],
      nameproblem: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])],
      description: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(500)
        ])],
      fecha: ['', Validators.required],
    });
  }

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

  isEdit() {
    if (this.id !== null) {
      this.title = 'Editar problema';
      this.btn = 'Editar problema';
      this.problemService.getProblem(this.id).subscribe((data) => {
        this.form.setValue({
          nombre: data.nombre,
          problem: data.problem,
          descripcion: data.descripcion,
          // usuario: data.usuario,
        });
        const output = document.getElementById('idProblem');
        if (output){
          output.setAttribute("value",data.problem)
        }
      });
    }
  }

  public loaderToken() {
    if (this.tokenService.getToken()) {
      if(this.tokenService.getAuthorities().length < 2){
      this.router.navigateByUrl("/register-problem");
      }
    } else {
      this.router.navigateByUrl("/login");
    }
  }
}
