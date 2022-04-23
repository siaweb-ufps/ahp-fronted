import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/service/token.service';
import { ProblemService } from 'src/app/service/problem.service';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-problem',
  templateUrl: './register-problem.component.html',
  styleUrls: ['./register-problem.component.scss'],
})
export class RegisterProblemComponent implements OnInit {
  public form!: FormGroup;
  title: string = 'Registrar problema';
  btn: string = 'Agregar';
  id: string | null;
  iduser:any;
  usuario: any = localStorage.getItem('email');

  constructor(
    private problemService: ProblemService,
    private authService: AuthService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ) {
    this.id = aRouter.snapshot.paramMap.get('idProblema');
  }
  ngOnInit(): void {
    if(this.id!=null){
      this.isEdit();
    }
    this.form = this.formBuilder.group({
      usuario: {},
      descripcion: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(500)]),
      ],
      fechaFinalizacion: ['', Validators.required],
      fechaCreacion: [new Date]

    });
  }

  input: any = {
    title: 'Título del problema',
    name: 'nameproblem',
    placeholder: 'Lorem ipsum',
    type: 'text',
  };

  textarea: any = {
    title: 'Descripción',
    name: 'description',
    placeholder: 'Lorem ipsum',
  };

  sendData() {
    this.problemService.getUser(this.usuario).subscribe((el) => {
      this.form.patchValue({
        usuario: el,
      });
      console.log(this.form);
      if (!this.form.valid) {
        this.toastr.error('¡Datos incorrectos!', 'ERROR', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        console.log('error en send data valid');
        return;
      }

      if (this.id !== null) {
        this.problemService.getUser(this.usuario).subscribe((el) => {
          this.form.patchValue({
            usuario: el,
          });
          if (this.id !== null) {
            this.form.value.idProblema = this.id;
            this.problemService
              .editProblem(this.id, this.form.value).subscribe((data) => {
                this.toastr.success('Problema Editado Con Exito!', 'Problema Editado', {
                  positionClass: 'toast-bottom-right' 
                })
              });
              this.toastr.success('Problema Editado Con Exito!', 'Problema Editado', {
                positionClass: 'toast-bottom-right' 
              })
              this.router.navigate(["/list-problem"]);
            }
          });
      } else {
        this.problemService.post(this.form.value).subscribe(
          (data) => {
            this.router.navigate(['/list-problem']);
              this.toastr.success('Problema creado', 'OK', {
                positionClass: 'toast-top-center',
                timeOut: 3000,
              });
              this.router.navigate(["/list-problem"]);
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
      
      if (this.id !== null) {
        this.title = 'Editar problema';
        this.btn = 'Editar';
        this.problemService.getProblem(this.id).subscribe((data) => {
          this.form.setValue({
            fechaCreacion: data.fechaCreacion,
            fechaFinalizacion: data.fechaFinalizacion,
            descripcion: data.descripcion,
            usuario: this.usuario,
          });
          const output = document.getElementById('idProblema');
          if (output) {
            output.setAttribute('value', data.idProblema);
          }
        });
      }
    });
  }
}
