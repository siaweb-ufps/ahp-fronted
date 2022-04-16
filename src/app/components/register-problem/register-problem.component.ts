import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/service/token.service';
import { ProblemService } from 'src/app/service/problem.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register-problem',
  templateUrl: './register-problem.component.html',
  styleUrls: ['./register-problem.component.scss'],
})
export class RegisterProblemComponent implements OnInit {
  public form!: FormGroup;
  title:string = 'Registrar problema';
  btn:string = 'Agregar'; 
  public usuarios:any = [];
  id: string | null;  

  constructor(
    private problemService: ProblemService,
    private authService: AuthService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private router: Router,
    private aRouter: ActivatedRoute,
  ) {
    this.id = aRouter.snapshot.paramMap.get('problem');
  }
  ngOnInit(): void {
    this.loaderToken();
    this.authService.getUsers().subscribe(usuario=>{
      this.usuarios = usuario; 
      console.log('empresas', this.usuarios);
    })
    this.isEdit();
    this.form = this.formBuilder.group({
      description: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(500)
        ])],
        usuario: ['', Validators.compose([
          Validators.required
        ])],
    });
  }

  input:any = {
    title: 'Título del problema',
    name: 'nameproblem',
    placeholder: 'Lorem ipsum',
    type: 'text',
  };
  
  textarea:any = {
    title: 'Descripción',
    name: 'description',
    placeholder: 'Lorem ipsum',
  };

  // public loadUser(){
  //   console.log('cargando');
    
  //   this.authService.getUsers().subscribe(usuario=>{
  //     this.usuarios = usuario; 
  //     console.log('empresas', this.usuarios);
  //   })
  // }

  sendData() {
    let informacion =(this.form.value);
    var usuario = {
      "nombre":informacion.nombre,
      "email":informacion.email,
      "password": informacion.password,
      "empresa": informacion.empresa,
      "profesion": informacion.profesion,
      "celular": informacion.celular,
    }

    console.log('Enviado');
    if (!this.form.valid) {
      console.log('error en send data valid');
      return;
    }

    // this.problemService.post(this.form.value)
    this.problemService.post(usuario)
      .subscribe(data => {
        console.log("form value: " + this.form.value);
        console.log('Agregado con exito');
      });
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
