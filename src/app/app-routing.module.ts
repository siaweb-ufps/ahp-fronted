import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QualifyComponent } from './components/qualify/qualify.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterDeciderComponent } from './components/register-decider/register-decider.component';
import { ChartComponent } from './components/chart/chart.component';
import { ProblemComponent } from './components/problem/problem.component';
import { ListProblemComponent } from './components/list-problem/list-problem.component';
import { ListDeciderComponent } from './components/list-decider/list-decider.component';
import { ListCriterionComponent } from './components/list-criterion/list-criterion.component';
import { ListAlternativeComponent } from './components/list-alternative/list-alternative.component';
import { RegisterProblemComponent } from './components/register-problem/register-problem.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordComponent } from './components/password/password.component';
import { RegisterCriterionComponent } from './components/register-criterion/register-criterion.component';
import { RegisterAlternativeComponent } from './components/register-alternative/register-alternative.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { AccessGuard } from './guards/AccessGuard';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditCriterionComponent } from './components/edit-criterion/edit-criterion.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component:LoginComponent},
  {path: 'login/confirmation/:idConfirmation', component:ConfirmationComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'register-decider/:idProblema', component:RegisterDeciderComponent,data:{requiresLogin: true},canActivate: [ AccessGuard]},
  {path: 'chart', component:ChartComponent,data:{requiresLogin: true},canActivate: [ AccessGuard]},
  {path: 'problem/:idProblema', component:ProblemComponent,data:{requiresLogin: true},canActivate: [ AccessGuard]},
  {path: 'list-decider/:idProblema', component:ListDeciderComponent,data:{requiresLogin: true},canActivate: [ AccessGuard]},
  {path: 'list-criterion/:idProblema', component:ListCriterionComponent,data:{requiresLogin: true},canActivate: [ AccessGuard]},
  {path: 'list-alternative/:idProblema', component:ListAlternativeComponent,data:{requiresLogin: true},canActivate: [ AccessGuard]},
  {path: 'register-problem', component:RegisterProblemComponent,data:{requiresLogin: true},canActivate: [ AccessGuard]},
  {path: 'list-problem', component:ListProblemComponent,data:{requiresLogin: true},canActivate: [ AccessGuard]},
  {path: 'password-reset', component:PasswordResetComponent},
  {path: 'password-reset/confirmation/:idConfirmation', component:PasswordComponent},
  {path: 'register-criterion/:idProblema', component:RegisterCriterionComponent,data:{requiresLogin: true},canActivate: [ AccessGuard]},
  {path: 'register-alternative/:idProblema', component:RegisterAlternativeComponent,data:{requiresLogin: true},canActivate: [ AccessGuard]},
  {path: 'edit-user', component:EditUserComponent,data:{requiresLogin: true},canActivate: [ AccessGuard]},
  {path: 'qualify/:idProblema/:emailDecisor', component:QualifyComponent},
  {path: 'my-account', component:MyaccountComponent,data:{requiresLogin: true},canActivate: [ AccessGuard]},
  {path:"edit-problem/:idProblema", component:RegisterProblemComponent,data:{requiresLogin: true},canActivate: [ AccessGuard]},
  {path:"edit-criterion/:idProblema", component:EditCriterionComponent,data:{requiresLogin: true},canActivate: [ AccessGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
