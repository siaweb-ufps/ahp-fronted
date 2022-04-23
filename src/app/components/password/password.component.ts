import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private route: Router,
    private tokenS:TokenService,
    private toastr: ToastrService   

  ) { }

  ngOnInit(): void {
    this.idConfirmation = this.aRouter.snapshot.paramMap.get('idConfirmation');
    this.password = this.formulario.group({
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      passwordConfirmation: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ]
    })
  }

  public enviarPassword(){

    let pass= (this.password.value.password);
    let passConfirm=(this.password.value.passwordConfirmation);

    if(pass!=passConfirm){
      this.toastr.warning("Las contraseñas no coinciden", "WARN", {
        positionClass: 'toast-top-center',
        timeOut: 3000
       })
       return;
    }

    let infoLogin = {
      email:" ",
      password:this.password.value.password
    }

    this.authService.cambiarPassword(infoLogin,this.idConfirmation).subscribe(res=>{
      this.toastr.success("Contraseña cambiada", "OK", {
        positionClass: 'toast-top-center',
        timeOut: 3000
       })
       this.route.navigateByUrl("")
    },error=>{
        this.toastr.error(error.mensaje, "ERROR", {
          positionClass: 'toast-top-center',
          timeOut: 3000
         }) 
    })
  }

}
