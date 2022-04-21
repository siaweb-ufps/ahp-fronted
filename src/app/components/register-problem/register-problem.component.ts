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
    this.loaderToken();
      this.isEdit();
      console.log(this.id);

    this.form = this.formBuilder.group({
      usuario: {},
      descripcion: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(500)]),
      ],
      fechaFinalizacion: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
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
            this.problemService
              .editProblem(this.id, this.form.value).subscribe((data) => {
                this.toastr.success('Problema Editado Con Exito!', 'Problema Editado', {
                  positionClass: 'toast-bottom-right' 
                })
                this.router.navigate(["/list-problem"]);
              });
            }
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
    console.log('feo');
    
    this.problemService.getUser(this.usuario).subscribe((el) => {
      console.log('entre');      console.log('id1: ',this.id);

      this.form.patchValue({
        usuario: el,
      });
  
      if (this.id !== null) {
      console.log('id2: ',this.id);

        this.title = 'Editar problema';
        this.btn = 'Editar';
        this.problemService.getProblem(this.id).subscribe((data) => {
          console.log(data);
      console.log('id3: ',this.id);
          
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
      console.log('id4'+this.id);
      
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
