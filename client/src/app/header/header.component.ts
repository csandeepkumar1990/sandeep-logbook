import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import queryString from 'query-string';

import { UserData } from './user-info';
import { LoginService } from '../services/login.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData: UserData = {
    name: '',
    avatar: '',
    auth: false,
  };

  constructor(
    private cookieService: CookieService,
    private loginService: LoginService,
    private router: Router
    ) {
      this.router.events.pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          const user = this.cookieService.get('user');
          if (user) {
            this.userData = queryString.parse(user);
            this.userData.auth = true;
          } else {
            this.userData.auth = false;
          }
          console.log(this.userData);
        })
    }

  logOut() {
    this.loginService.logOut()
      .subscribe((res: any) => {
        if (res.msg === 'success') {
          console.log(res);
          this.userData.auth = false;
          this.router.navigate([this.router.url]);
        }
      });
  }
  
  ngOnInit() {
  }

}
