import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // formGroup: FormGroup;
  image:any = 'https://images.unsplash.com/photo-1634087990018-415aeb951215?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80';
  logo:any = './assets/images/min-logo.png';

  isAdmin = false;
  isLogged = false;
  isLoginFail = false;
  loginUser!: LoginUser;
  email!:string;
  password!:string;
  roles:string[] = [];
  errMsj!:string;

  constructor(
    public formulario:FormBuilder, 
    private authService:AuthService,
    private tokenService:TokenService,
    private router: Router,
    // private toastr: ToastrService
  ) {
    // this.formGroup = this.formulario.group({
    //   email:[''],
    //   password:[''],
    // })
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.router.navigate(['/']);
      this.isLoginFail = false;
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
}
