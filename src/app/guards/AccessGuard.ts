import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { TokenService } from "../service/token.service";

@Injectable()
export class AccessGuard implements CanActivate {

    constructor(
        private router:Router,
        private tokenS:TokenService
        ){}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    const requiresLogin = route.data["requiresLogin"] || false;
    if (requiresLogin) {
      if(this.tokenS.getToken()!=null){
          return true;
      }else{
        this.router.navigate(['/']);
      }
    }
    return false;
  }
}