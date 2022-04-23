import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {faUser,faUserEdit} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editInfo!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authS: AuthService,
    private toastr: ToastrService,

    ) { }

  ngOnInit(): void {
    this.editInfo = this.fb.group({
      idUsuario:[''],
      roles:[[]],
      fecha:[''],
      estado:true,
      confirmationToken:"",
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
    this.loadUser()
  }
  faUser = faUser;
  faUserEdit = faUserEdit;

  loadUser(){
    let email=localStorage.getItem("email");
    this.authS.getUser(email!).subscribe(resp=>{
      this.editInfo.setValue({
        roles:resp.roles,
        idUsuario:resp.idUsuario,
        fecha:resp.fecha,
        nombre:resp.nombre,
        email:resp.email,
        password:resp.password,
        profesion:resp.profesion,
        empresa:resp.empresa,
        celular:resp.celular,
        confirmationToken:resp.confirmationToken,
        estado:resp.estado
      })
    })
    
  }

  onEdit(){
    if(this.editInfo.status!="VALID"){
      this.toastr.error("Datos incorrectos", 'ERROR', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });
    }else{
      this.authS.editUser(this.editInfo.value).subscribe(resp=>{
        this.toastr.success(resp.mensaje, 'OK', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      })
    }
  } 
}
