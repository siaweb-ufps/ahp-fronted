import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as global from 'global'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QulifyService {

  url = `${global.url}/`;

  constructor(private httpClient:HttpClient) { }


  public getPairsCriterion(tokenProblema:string): Observable<any>{
    return this.httpClient.get<any>(this.url+"problema/criteriosComparados/"+tokenProblema);
  }
  public getPairsCriterionAlternative(tokenProblema:string): Observable<any>{
    return this.httpClient.get<any>(this.url+"problema/alternativaComparadas/"+tokenProblema);
  }

  public getAccessProblem(tokenProblem:string, emailDecisor:string): Observable<any>{
    return this.httpClient.get<any>(this.url+"problema/accesoproblema/"+tokenProblem+"/"+emailDecisor);
  }
  
  public getCriterionProblem(tokenProblem:string): Observable<any>{
    return this.httpClient.get<any>(this.url+"problema/criterios/"+tokenProblem);
  }

  public getAlternativeProblem(tokenProblem:string): Observable<any>{
    return this.httpClient.get<any>(this.url+"problema/alternativas/"+tokenProblem);
  }

  public saveQualifies(puntuaciones:any): Observable<any>{
    return this.httpClient.post<any>(this.url+"puntuacioncriterio/",puntuaciones);
  }
  public saveQualifiesAlternatives(puntuaciones:any): Observable<any>{
    return this.httpClient.post<any>(this.url+"puntuacionalternativa/",puntuaciones);
  }

  public getPrioritiesCriterions(email:any,token:any): Observable<any>{
    return this.httpClient.get<any>(this.url+"puntuacioncriterio/"+email+"/"+token);
  }
  public getPrioritiesAlternatives(email:any,token:any): Observable<any>{
    return this.httpClient.get<any>(this.url+"puntuacionalternativa/"+email+"/"+token);
  }

}
