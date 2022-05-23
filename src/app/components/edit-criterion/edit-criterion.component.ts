import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/service/token.service';
import { ProblemService } from 'src/app/service/problem.service';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { faPlus, faLeftLong } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-criterion',
  templateUrl: './edit-criterion.component.html',
  styleUrls: ['./edit-criterion.component.scss']
})
export class EditCriterionComponent implements OnInit {

  faPlus = faPlus;
  faLeftLong = faLeftLong;
  findProblem:any[] = [];
  public form!: FormGroup;
  title: string = 'Editar criterio';
  btn: string = 'Actualizar';
  idProblema: string | null;
  iduser:any;
  usuario: any = localStorage.getItem('email');

  constructor(
    private problemService: ProblemService,
    private authService: AuthService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private renderer2: Renderer2,
  ) {
    this.idProblema = aRouter.snapshot.paramMap.get('idProblema');
  }

  textarea: any = {
    title: 'Descripción',
    name: 'description',
    placeholder: 'Lorem ipsum',
  };

  ngOnInit(): void {
    if(this.idProblema!=null){
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
      token:[' ']
    });
  }

  isEdit() {
    this.problemService.getUser(this.usuario).subscribe((el) => {
      if (this.idProblema !== null) {
        this.problemService.getProblem(this.idProblema).subscribe((data) => {
          this.form.setValue({
            descripcion: data.descripcion
          });
          const output = document.getElementById('idProblema');
          if (output) {
            output.setAttribute('value', data.idProblema);
          }
        });
      }
    });
  }

  sendData() {}
}
