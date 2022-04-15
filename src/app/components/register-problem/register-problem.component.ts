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
  ngOnInit(): void {
    this.loaderToken();
    this.isEdit();
    this.form = this.formBuilder.group({
      idProblema: ['', Validators.compose([
        Validators.required,
        Validators.min(100000000),
        Validators.max(9999999999)
      ])],
      nombre: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ])],
      direccion: ['',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50)
        ])],
      mision: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(500)
        ])],
      vision: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(500)
        ])],
      correo: ['',
        Validators.compose([
          Validators.required,
          Validators.email,
        ])],
      telefono: ['',
        Validators.compose([
          Validators.required,
          Validators.min(1000000),
          Validators.max(9999999999),
        ])],
      descripcion: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(500)
        ])],
      urlImagen: ['',
        Validators.compose([
          Validators.required,
          Validators.maxLength(500)
        ])],
      fecha: ['', Validators.required],
      estado: ['',
        Validators.compose([
          Validators.required
        ])],
        idCategoria:['', Validators.compose([
          Validators.required,
        ])],
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
      this.title = 'Editar Aliado';
      this.btn = 'Editar Aliado';
      this.problemService.getProblem(this.id).subscribe((data) => {
        this.form.setValue({
          email: data.email,
          celular: data.celular,
          nombre: data.nombre,
          empresa: data.empresa,
          profesion: data.profesion,
          fecha: data.fecha,
          idProblema: data.idProblema,
          decisor: data.decisor,
          alternativaCollection: data.alternativaCollection,
          isUsuario: data.isUsuario,
          roles: data.roles,
        });
        const output = document.getElementById('idProblem');
        if (output){
          output.setAttribute("value",data.idProblema)
        }
      });
    }
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
