import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { SimpleModalComponent, ModalDialogService } from 'ngx-modal-dialog';

import { RegisterInfo } from './register-info';
import { SignUpService } from '../services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  registerInfo: RegisterInfo = {
    name: '',
    email: '',
    pass: '',
    rePass: '',
  }

  errMsg: any = {
    class: 'hidden',
    msg: ''
  }

  constructor(private signUpService: SignUpService, private router: Router, private modalService: ModalDialogService, private viewRef: ViewContainerRef) { }

  ngOnInit() {
  }

  onChange() {
    this.errMsg = {
      class: 'hidden',
      msg: ''
    }
  }

  onSubmit(): void{
    const info = this.registerInfo;
    console.log(info)
    this.signUpService.register(info)
      .subscribe((res: any) => {
        if(res.err) {
          this.errMsg.class = null;
          this.errMsg.msg = res.err;
          console.log('res', this.errMsg);
          return;
        }
        console.log('back',res);
        let title, text;
        if (res.msg === 'success') {
          title = 'Success',
          text = 'Registered successfully.'
        } else {
          title = 'Warning',
          text = res.msg
        }
        this.modalService.openDialog(this.viewRef, {
          title,
          childComponent: SimpleModalComponent,
          data: { text },
          actionButtons: [
            { text: 'continue',
              onAction: () => {
              console.log('sssssssssss');
              this.router.navigateByUrl(res.redirect);
              return true;
              }
            }
          ],
        });
      });
  }
}
