import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    public formulario:FormBuilder,
    private authS: AuthService,
    private toastr: ToastrService    
  ) {
    this.formGroup = this.formulario.group({
      email:[''],
    })
  }

  ngOnInit(): void {
  }

  image:any = 'https://images.unsplash.com/photo-1634087990018-415aeb951215?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80';
  logo:any = './assets/images/min-logo.png';

  enviarSolicitud(){

    this.authS.solicitudCambioPassword(this.formGroup.value.email).subscribe(res=>{
      this.toastr.success("Correo enviado, porfavor revisa tu bandeja de entrada", "OK", {
        positionClass: 'toast-top-center',
        timeOut: 3000
       }) 
    },error=>{
        this.toastr.error(error.error.mensaje, "ERROR", {
          positionClass: 'toast-top-center',
          timeOut: 3000
         }) 

    })
  }

}
