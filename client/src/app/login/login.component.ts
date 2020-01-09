import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { SimpleModalComponent, ModalDialogService } from 'ngx-modal-dialog';

import { LoginInfo } from './login-info';
import { LoginService } from '../services/login.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginInfo: LoginInfo = {
    email: '',
    pass: ''
  }

  errMsg: any = {
    class: 'hidden',
    msg: ''
  }
  constructor(private loginService: LoginService, private router: Router, private modalService: ModalDialogService, private viewRef: ViewContainerRef) { }
  
  ngOnInit() {
  }
  
  onChange() {
    this.errMsg = {
      class:'hidden',
      msg: ''
    }
  }

  twitterLogin() {
    this.loginService.twitterLogin()
    .subscribe((res: any) => {
      console.log('twitter', typeof res.authURL);
      const url = res.authURL;
        if(res.authURL) {
          window.location.href = url;
          return;
        }
      })
  }

  onSubmit(info: LoginInfo): void {
    this.loginService.login(info)
      .subscribe((res: any) => {
        if(res.err) {
          this.errMsg.class = null;
          this.errMsg.msg = res.err;
          console.log('res', this.errMsg);
          return;
        }
        this.modalService.openDialog(this.viewRef, {
          title: 'Success',
          childComponent: SimpleModalComponent,
          data: {
            text: 'Logged in successfully.'
          },
          actionButtons: [
            { text: 'continue',
              onAction: () => {
              console.log('sssssssssss');
              window.localStorage.setItem('sid', res.name)
              this.router.navigateByUrl(res.redirect);
              return true;
              }
            }
          ],
          });
        });
  }
}
