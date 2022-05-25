import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/service/token.service';
import { ProblemService } from 'src/app/service/problem.service';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { faPlus, faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register-problem',
  templateUrl: './register-problem.component.html',
  styleUrls: ['./register-problem.component.scss'],
})
export class RegisterProblemComponent implements OnInit {
  faPlus = faPlus;
  faLeftLong = faLeftLong;
  // @ViewChild('asDisabledAlternative') disabledalternative!: ElementRef;
  // @ViewChild('asDisabledCriterion') disabledcriterion!: ElementRef;
  findProblem:any[] = [];
  public form!: FormGroup;
  title: string = 'Registrar problema';
  btn: string = 'Agregar';
  id2: string | null;
  iduser:any;
  isFalse:boolean = false;
  usuario: any = localStorage.getItem('email');

  constructor(
    private location: Location,
    private problemService: ProblemService,
    private authService: AuthService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private renderer2: Renderer2,
  ) {
    this.id2 = aRouter.snapshot.paramMap.get('idProblema');
  }
  ngOnInit(): void {
    if(this.id2!=null){
      this.isFalse = true;
      this.isEdit();     
    }
    this.form = this.formBuilder.group({
      usuario: {},
      descripcion: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(500)]),
      ],
      fechaFinalizacion: ['', Validators.required],
      fechaCreacion: [new Date],
      token:[' '],
      idProblema: [''],
      estado: [''],
    });
  }

  goBack():void { this.location.back(); }

  textarea: any = {
    title: 'Descripción',
    name: 'description',
    placeholder: 'Lorem ipsum',
  };

  // change() {
  //   const asDisabledAlternative = this.disabledalternative.nativeElement;
  //   this.renderer2.removeAttribute(asDisabledAlternative, 'disabled');
  // }

  sendData() {
    this.problemService.getUser(this.usuario).subscribe((el) => {
      this.form.patchValue({
        usuario: el,
      });
      if (!this.form.valid) {
        this.toastr.error('¡Datos incorrectos!', 'ERROR', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        console.log('error en send data valid');
        return;
      }

      if (this.id2 !== null) {
        this.problemService.getUser(this.usuario).subscribe((el) => {
          this.form.patchValue({
            usuario: el,
          });
          if (this.id2 !== null) {            
            this.problemService
              .editProblem(this.id2, this.form.value).subscribe(
                (data) => {
                  this.router.navigate(["/list-problem"]);
                  this.toastr.success('Problema Editado Con Exito!', 'OK', {
                    positionClass: 'toast-bottom-right',
                    timeOut: 3000,
                  })
                },
                (error) => {
                  // this.toastr.error('Error al editar el problema!', 'ERROR', {
                  //   positionClass: 'toast-bottom-right',
                  //   timeOut: 3000,
                  // })
                  this.router.navigate(["/list-problem"]);
                  this.toastr.success('Problema Editado Con Exito!', 'OK', {
                    positionClass: 'toast-bottom-right',
                    timeOut: 3000,
                  })
                })
            }
          });
      } else {
        this.problemService.post(this.form.value).subscribe(
          (res) => {
            this.router.navigate(['/problem/',res.token]);
            this.toastr.success('Problema creado', 'OK', {
              positionClass: 'toast-top-center',
              timeOut: 3000,
            });
            // const asDisabledCriterion = this.disabledcriterion.nativeElement;
            // this.renderer2.removeAttribute(asDisabledCriterion, 'disabled');       
          },
          (error) => {
            this.toastr.error(error.mensaje, 'ERROR', {
              positionClass: 'toast-top-center',
              timeOut: 3000,
            });
          }
        );
      }
    });
  }
  
  isEdit() {
    this.problemService.getUser(this.usuario).subscribe((el) => {
      this.form.patchValue({
        usuario: el,
      });
      
      if (this.id2 !== null) {
        this.title = 'Editar problema';
        this.btn = 'Editar';        
        this.problemService.getProblem(this.id2).subscribe((data) => {
            this.form.setValue({
            fechaCreacion: data.fechaCreacion,
            fechaFinalizacion: data.fechaFinalizacion,
            descripcion: data.descripcion,
            usuario: this.usuario,
            idProblema:data.idProblema,
            token:data.token,
            estado:data.estado,
          });
          
          const output = document.getElementById('id2');
          if (output) {
            output.setAttribute('value', data.id2);
          }
        });
      }
    });
  }
}