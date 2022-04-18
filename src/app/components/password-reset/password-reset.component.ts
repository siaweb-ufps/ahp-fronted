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
    console.log(this.formGroup.value.email);
    this.authS.solicitudCambioPassword(this.formGroup.value.email).subscribe(res=>{
    },error=>{
      if(error.status==200){
        console.log(error.error.text); 
        this.toastr.success("Correo enviado, porfavor revisa tu bandeja de entrada", "OK", {
          positionClass: 'toast-top-center',
          timeOut: 3000
         }) 
        // Significa que el correo y todo está correcto, colocar notificacion que diga que ya se envio el correo y que se revise.
      }
      if(error.status==404){
        this.toastr.error("El correo no se encuentra registrado", "ERROR", {
          positionClass: 'toast-top-center',
          timeOut: 3000
         }) 
      }

    })
  }

}
