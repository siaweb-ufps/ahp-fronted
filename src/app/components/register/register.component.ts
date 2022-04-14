import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';
import { NewUser } from 'src/app/models/new-user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  logo:any = './assets/images/min-logo.png';
  image:any = 'https://images.unsplash.com/photo-1634087990018-415aeb951215?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80';

  registerInfo!: FormGroup;
  newUser!: NewUser;

  nombre!: string;
  email!: string;
  celular!: string;
  profesion!: string;
  empresa!: string;
  password!: string;

  isLogged:boolean = false;
  // isAdmin:boolean = false;
  isRegister:boolean = false;
  isRegisterinFail:boolean = false;
  // roles:string[] = [];
  errMsj!:string;

  constructor(
    private authService:AuthService,
    private tokenService:TokenService,
    private fb: FormBuilder,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.registerInfo = this.fb.group({
      nombre:['',Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
      ])],
      email:['',Validators.compose([
        Validators.required, 
        Validators.email
      ])],
      password:['',Validators.compose([
        Validators.required, 
        Validators.minLength(5),
      ])],
      profesion: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
      ])],
      empresa: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ])],
      celular: ['', Validators.compose([
        Validators.required,
        Validators.min(3000000000),
        Validators.max(3999999999)]
      )]
  })

    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.router.navigate(['/']);
    }
  }

  onRegister(): void {
    let informacion =(this.registerInfo.value);
    var usuarioNuevo = {
      "nombre":informacion.nombre,
      "email":informacion.email,
      "password": informacion.password,
      "empresa": informacion.empresa,
      "profesion": informacion.profesion,
      "celular": informacion.celular,
    }

    this.newUser = new NewUser(this.email, this.password, this.celular, this.empresa, this.nombre, this.profesion);
    console.log(this.newUser);console.log(usuarioNuevo);
    this.authService.new(usuarioNuevo).subscribe(
      data => {
        this.isRegister = true;
        this.isRegisterinFail = false;
        this.router.navigate(['/login']);
      },
      err => {
        this.isRegister = false;
        this.isRegisterinFail = true;
        this.errMsj = err.error.message;
      }
    );
  }
}
