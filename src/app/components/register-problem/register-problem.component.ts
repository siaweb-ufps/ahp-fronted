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
    console.log('dsdjsdd: ',aRouter.snapshot.paramMap.get('idProblema'));
    
    this.id = aRouter.snapshot.paramMap.get('idProblema');
  }
  ngOnInit(): void {
    console.log('id: ',this.id)
    this.loaderToken();
    this.isEdit();

    this.form = this.formBuilder.group({
      usuario: {},
      descripcion: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(500)]),
      ],
      fechaFinalizacion: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
    });
    // console.log(this.form.value);
    // console.log(typeof this.form);
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
      if (!this.form.valid) {
        this.toastr.error('¡Datos incorrectos!', 'ERROR', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        console.log('error en send data valid');
        return;
      }

      if (this.id !== null) {
        this.problemService
          .editProblem(this.id, this.form.value).subscribe((data) => {
            this.toastr.success('Seguro Editado Con Exito!', 'Seguro Editado', {
              positionClass: 'toast-bottom-right' 
            })
            this.router.navigate(["/list-problem"]);
          });
      } else {
        this.problemService.post(this.form.value).subscribe(
          (data) => {
            console.log('Agregado con exito');
          },
          (error) => {
            if (error.status == 200) {
              this.router.navigate(['/list-problem']);
              this.toastr.success('Problema creado', 'OK', {
                positionClass: 'toast-top-center',
                timeOut: 3000,
              });
            }
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
            nombre: data.nombre,
            problem: data.problem,
            fechaCreacion: data.fechaCreacion,
            fechaFinalizacion: data.fechaFinalizacion,
            descripcion: data.descripcion,
          });
          const output = document.getElementById('idProblema');
          if (output) {
            output.setAttribute('value', data.idProblema);
          }
        });
      }
    });
  }

  public loaderToken() {
    if (this.tokenService.getToken()) {
      if (this.tokenService.getAuthorities().length < 2) {
        this.router.navigateByUrl('/register-problem');
      }
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
