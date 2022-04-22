import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  image:any = 'https://images.unsplash.com/photo-1634087990018-415aeb951215?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80';
  logo:any = '/assets/images/min-logo.png';
  faXmark = faXmark;
  idConfirmation!:any;


  loginInfo!: FormGroup;
  loginUser!: LoginUser;
  isAdmin:boolean = false;
  isLogged:boolean = false;
  isLoginFail:boolean = false;
  email!:string;
  password!:string;
  roles:string[] = [];
  errMsj!:string;
  mensaje!:string;

  constructor(
    private aRouter: ActivatedRoute, 
    private authS: AuthService,
    private toastr: ToastrService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.idConfirmation = this.aRouter.snapshot.paramMap.get('idConfirmation');
    this.confirmarCuenta()
  }

  public confirmarCuenta(){
    this.authS.confirmacionCuenta(this.idConfirmation).subscribe(res=>{

    },error=>{
      if(error.status==200){
        this.mensaje = "Cuenta confirmada"
        this.toastr.success("Cuenta confirmada", "OK", {
          positionClass: 'toast-top-center',
          timeOut: 3000
         })
          
        this.route.navigateByUrl("")
      }else{
        console.log(error);
        this.toastr.error(error.error.text, "ERROR", {
          positionClass: 'toast-top-center',
          timeOut: 3000
         }) 
      }
    })
  }
}
