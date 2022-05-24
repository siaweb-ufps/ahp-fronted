import * as global from 'global'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlternativeService {
  url=`${global.url}/alternativa/`;
  uri=`${global.url}/problema/alternativas/2cfc671b-da58-4cb5-b10c-6d20b9591345`;

  constructor(private http: HttpClient) { }

  public getAlternatives():Observable<any>{
    return this.http.get<any>(this.url);
  }

  public post(alternative:any):Observable<any>{
    return this.http.post<any>(this.uri,alternative);
  }

  editAlternative(id:string,alternative:any):Observable<any>{
    return this.http.put(this.url,alternative)
  }
}
