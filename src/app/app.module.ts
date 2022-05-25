import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
// import { DataTablesModule } from "angular-datatables";

import { AppComponent } from './app.component';
// Components
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ImageComponent } from './components/layout/image/image.component';
import { RegisterDeciderComponent } from './components/register-decider/register-decider.component';
import { NavComponent } from './components/layout/nav/nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChartComponent } from './components/chart/chart.component';
import { ListProblemComponent } from './components/list-problem/list-problem.component';
import { ListDeciderComponent } from './components/list-decider/list-decider.component';
import { RegisterProblemComponent } from './components/register-problem/register-problem.component';
import { InputComponent } from './components/layout/input/input.component';
import { TextareaComponent } from './components/layout/textarea/textarea.component';
import { ButtonComponent } from './components/layout/button/button.component';
import { ProblemComponent } from './components/problem/problem.component';
import { ListCriterionComponent } from './components/list-criterion/list-criterion.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { RegisterCriterionComponent } from './components/register-criterion/register-criterion.component';
import { RegisterAlternativeComponent } from './components/register-alternative/register-alternative.component';
import { QualifyComponent } from './components/qualify/qualify.component';
//Interceptors
import { interceptorProvider } from './components/interceptors/paq-interceptor.service';
import { ProblemService } from './service/problem.service';
import { PasswordComponent } from './components/password/password.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { AccessGuard } from './guards/AccessGuard';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditCriterionComponent } from './components/edit-criterion/edit-criterion.component';
import { ListAlternativeComponent } from './components/list-alternative/list-alternative.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ImageComponent,
    RegisterDeciderComponent,
    NavComponent,
    ChartComponent,
    ListProblemComponent,
    ListDeciderComponent,
    RegisterProblemComponent,
    InputComponent,
    TextareaComponent,
    ButtonComponent,
    ProblemComponent,
    ListCriterionComponent,
    PasswordResetComponent,
    RegisterCriterionComponent,
    RegisterAlternativeComponent,
    QualifyComponent,
    PasswordComponent,
    ConfirmationComponent,
    MyaccountComponent,
    EditUserComponent,
    EditCriterionComponent,
    ListAlternativeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [interceptorProvider, ProblemService, AccessGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
