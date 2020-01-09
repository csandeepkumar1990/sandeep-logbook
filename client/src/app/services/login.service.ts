import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(info) {
    console.log('loginpost');
    return this.http.post('api/login', info);
  }
  twitterLogin() {
    console.log('twitterlogin');
    return this.http.get('api/twitter-login');
  }
  logOut() {
    console.log('twitterlogin');
    return this.http.get('api/logout');
  }
}
