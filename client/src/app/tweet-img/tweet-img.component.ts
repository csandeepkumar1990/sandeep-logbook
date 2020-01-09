import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SimpleModalComponent, ModalDialogService } from 'ngx-modal-dialog';


import { ImageSnippet, TweetStatus } from './image-snippet';
import { TweetImgService } from '../services/tweet-img.service';

@Component({
  selector: 'app-tweet-img',
  templateUrl: './tweet-img.component.html',
  styleUrls: ['./tweet-img.component.scss']
})

export class TweetImgComponent implements OnInit {

  selectedFile: ImageSnippet;
  tweetStatus: TweetStatus = {
    status: '',
    err: false,
  };
  
  constructor(
    private tweetImgService: TweetImgService,
    private cookieService: CookieService,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef
    ) { }

  onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      if (this.tweetStatus.status) {
        this.tweetImgService.tweetImg(this.selectedFile.file, this.tweetStatus.status)
          .subscribe((res: any) => {
            if (res.err) {
              this.onError();
              console.log(res.redirect)
              // window.location.href = res.authURL;
              return;
            }
            this.onSuccess();
            window.location.href = res.authURL;
          })
      } else {
        console.log('false')
        this.tweetStatus.err = true;
      }
    });

    reader.readAsDataURL(file);
  }

  ngOnInit() {
    console.log(document.cookie)
    console.log(this.cookieService.get('new-tweet'));
    const newTweetURL = this.cookieService.get('new-tweet');
    if (newTweetURL) {
      this.modalService.openDialog(this.viewRef, {
        title: 'Success',
        childComponent: SimpleModalComponent,
        data: {
          text: 'Upload tweet img, click on Go to open the tweet'
        },
        actionButtons: [
          {
            text: 'Go',
            onAction: () => {
              window.open(newTweetURL, 'tab');
              this.cookieService.delete('new-tweet');
              return true;
            }
          },
          {
            text: 'Cancel',
            buttonClass: 'btn btn-primary cancel-modal',
            onAction: () => {
              this.cookieService.delete('new-tweet');
              return true;
            }
          },
        ]
      })
    }
  }
}
