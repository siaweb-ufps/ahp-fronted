import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QualifyComponent } from './components/qualify/qualify.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterDeciderComponent } from './components/register-decider/register-decider.component';
import { ChartComponent } from './components/chart/chart.component';
import { ProblemComponent } from './components/problem/problem.component';
import { ListProblemComponent } from './components/list-problem/list-problem.component';
import { HomeComponent } from './components/home/home.component';
import { ListDeciderComponent } from './components/list-decider/list-decider.component';
import { RegisterProblemComponent } from './components/register-problem/register-problem.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordComponent } from './components/password/password.component';
import { EditProblemComponent } from './components/edit-problem/edit-problem.component';
import { EditDeciderComponent } from './components/edit-decider/edit-decider.component';
import { RegisterCriterionComponent } from './components/register-criterion/register-criterion.component';
import { RegisterAlternativeComponent } from './components/register-alternative/register-alternative.component';

const routes: Routes = [
  // {path: '', pathMatch: 'full', redirectTo: ''},
  { path: '', component: LoginComponent },
  {path: 'login', component:LoginComponent},
  {path: 'contact', component:ContactComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'register-decider', component:RegisterDeciderComponent},
  {path: 'chart', component:ChartComponent},
  {path: 'problem', component:ProblemComponent},
  {path: 'list-decider', component:ListDeciderComponent},
  {path: 'register-problem', component:RegisterProblemComponent},
  {path: 'list-problem', component:ListProblemComponent},
  {path: 'password-reset', component:PasswordResetComponent},
  {path: 'password-reset/confirmation/:idConfirmation', component:PasswordComponent},
  {path: 'edit-problem', component:EditProblemComponent},
  {path: 'register-criterion', component:RegisterCriterionComponent},
  {path: 'register-alternative', component:RegisterAlternativeComponent},
  {path: 'edit-decider', component:EditDeciderComponent},
  {path: 'qualify', component:QualifyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
