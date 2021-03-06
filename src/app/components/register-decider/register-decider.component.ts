import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DeciderService } from 'src/app/service/decider.service';
import { ProblemService } from 'src/app/service/problem.service';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
@Component({
  selector: 'app-register-decider',
  templateUrl: './register-decider.component.html',
  styleUrls: ['./register-decider.component.scss']
})
export class RegisterDeciderComponent implements OnInit {
  faLeftLong = faLeftLong;

  public problems:any[]=[];
  public email:any = localStorage.getItem('email');
  public deciderInfo!:FormGroup
  idProblema: string | null;
  constructor(
    private location:Location,
    private problemS:ProblemService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private deciderS:DeciderService,
    private aRouter: ActivatedRoute,
    private router: Router,
  ) { 
    this.idProblema = aRouter.snapshot.paramMap.get('idProblema');
  }

  ngOnInit(): void {
    this.loadProblems();
    this.deciderInfo = this.fb.group({
      nombre:['',Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
      ])],
      email:['',Validators.compose([
        Validators.required, 
        Validators.email
      ])],
      problema:''
    })
  }

  register(){
    if(!this.deciderInfo.valid){
      this.toastr.error("Datos incorrectos", "ERROR", {
        positionClass: 'toast-top-center',
        timeOut: 3000
       })
       return;
    }

    this.deciderInfo.value.problema = this.idProblema;
    
    this.deciderS.saveDeciderByProblem(this.deciderInfo.value).subscribe(resp=>{
      this.router.navigate(['/list-decider/',this.idProblema]);
      this.toastr.success("Decisor agregado correctamente, se ha enviado un correo al email del decisor", "OK", {
        positionClass: 'toast-top-center',
        timeOut: 3000
       })
    },error=>{
      this.toastr.error("El decisor ya se encuentra registrado en este problema", "ERROR", {
        positionClass: 'toast-top-center',
        timeOut: 3000
       })
    })
  }

  loadProblems(){
    this.problemS.getProblemsUser(this.email).subscribe((resp:any)=>{
      this.problems = resp;
      this.problems = this.problems.filter(problem => problem.token == this.idProblema);
    })
  }

  goBack():void {
    this.location.back();
  }

}
