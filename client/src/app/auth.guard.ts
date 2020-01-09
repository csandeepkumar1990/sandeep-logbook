import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(): Observable<any> {
    return this.authService.checkAuth().pipe(map((res: any)=>{
      console.log('guard', res);
      if(!res.auth){
        this.router.navigateByUrl('/login');
      }
      return res.auth;
    }))
  }
}
