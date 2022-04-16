import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  image:any = 'https://images.unsplash.com/photo-1634087990018-415aeb951215?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80';
  logo:any = './assets/images/min-logo.png';
  
  password!: FormGroup;
  idConfirmation!:any;
  constructor(
    public formulario:FormBuilder,
    private authService:AuthService,
    private aRouter: ActivatedRoute, 
    private tokenS:TokenService
  ) { }

  ngOnInit(): void {
    this.idConfirmation = this.aRouter.snapshot.paramMap.get('idConfirmation');
    this.password = this.formulario.group({
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    })
  }

  public enviarPassword(){
    console.log(this.password);
    console.log(this.idConfirmation);

    let infoLogin = {
      email:this.tokenS.getEmail(),
      password:this.password
    }


    // this.authService.cambiarPassword()
  }

}
