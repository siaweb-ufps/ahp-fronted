import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  image:any = 'https://images.unsplash.com/photo-1634087990018-415aeb951215?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80';
  logo:any = './assets/images/min-logo.png';
  faXmark = faXmark;

  loginInfo!: FormGroup;
  loginUser!: LoginUser;
  isAdmin:boolean = false;
  isLogged:boolean = false;
  isLoginFail:boolean = false;
  email!:string;
  password!:string;
  roles:string[] = [];
  errMsj!:string;

  constructor(
    // public formulario:FormBuilder, 
    private authService:AuthService,
    private tokenService:TokenService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,

  ) { }
  
  ngOnInit(): void {
    this.loginInfo = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          Validators.email,
        ]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });

    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.router.navigate(['/']);
      this.isLoginFail = true;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  isAdministrador(){
    if(this.roles.length == 2){
      this.isAdmin=true;
    }
  }

  onLogin(): void {
    this.loginUser = new LoginUser(this.email, this.password);
    this.authService.login(this.loginUser).subscribe(
      data => {
        this.isLogged = true;
        this.tokenService.setToken(data.token);
        this.tokenService.setEmail(data.email);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.router.navigate(['/']);
      },
      err => {
        this.isLogged = false;
        this.errMsj = err.error.message;
      }
    );
  }

  guardarData() {
    localStorage.setItem("isLogged", "true");
    localStorage.setItem("email", this.loginInfo.value.email);

    if (!this.loginInfo.valid) {
      this.toastr.error('Datos incorrectos', 'ERROR', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
      return;
    }
  
    this.authService.login(this.loginInfo.value).subscribe(
      (data) => {
        this.isLogged = true;
        this.tokenService.setToken(data.token);
        this.tokenService.setEmail(data.email);
        this.tokenService.setAuthorities(data.authorities);

        this.roles = data.authorities;
        this.router.navigate(['/list-problem']);

        this.toastr.success('Bienvenido ', 'OK', {
          timeOut: 3000,
          positionClass: 'toast-bottom-center',
        });
      },
      (err) => {
        this.isLogged = false;
        this.errMsj = err.error;
        this.isLoginFail = true;
        
        if (typeof err.error == 'object') {
          this.toastr.error('Contraseña incorrecta', '', {
            timeOut: 3000,
            positionClass: 'toast-bottom-center',
          });
          return;
        }

        this.toastr.error(this.errMsj, '', {
          timeOut: 3000,
          positionClass: 'toast-bottom-center',
        });
      }
      );
  }
}
